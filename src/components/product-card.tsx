import { server } from "../redux/store";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";


type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  cutPrice: number;
  size: string;
  style: string;
  color: string;
  stock: number;
  numOfReviews: number,
  ratings: number
};

const ProductCard = ({
  productId,
  price,
  cutPrice,
  name,
  photo,
  size,
  color,
  style,
  stock,
  numOfReviews ,
  ratings
}: ProductsProps) => {

  const dispatch = useDispatch();


  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  return (
    <div>

      <Link to={`/product/${productId}`} className="mt-8 w-[120px] xsm:w-[170px] sm:w-[240px] flex flex-col gap-2">
        <img src={`${server}/${photo}`} alt={name} className="w-[150px] h-[150px] xsm:h-[200px] xsm:w-[200px] sm:h-[260px] sm:w-[260px] rounded-lg object-cover" />
        <p className="line-clamp-2 min-h-[3rem] w-full font-semibold mx-2">{name}</p>
        <span className="text-2xl mt-2 font-semibold mx-2">${price}{" "}<span className="text-sm line-through text-red-500 ">{cutPrice > 0 ? `$${cutPrice}` : ""}</span></span>
        <div className="flex flex-row items-center justify-between mx-2">
          <p className="fa fa-star text-orange-500 text-clip">({ratings})</p>
          <p className="font-semibold ">Reviews ({numOfReviews})</p>
        </div>
      </Link>
      <button
        className='w-full mt-4 psl-7 pr-2 py-2 text-center bg-yellow-500 rounded-md text-white text-sm sm:text-md font-semibold transition duration-300 ease-in-out hover:bg-yellow-600'
        onClick={() =>
          addToCartHandler({ productId, size, color, style, price, cutPrice, name, photo, stock, quantity: 1 })
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

