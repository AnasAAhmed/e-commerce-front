import { server } from "../redux/store";
import { Link } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  cutPrice: number;
  handleRelatedProductClick?: any;
};

const ProductCard = ({
  productId,
  price,
  cutPrice,
  name,
  photo,
  handleRelatedProductClick
}: ProductsProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-[35vh] bg-white shadow-md rounded-md transition-transform object-cover duration-300 transform hover:-translate-y-2 my-1 mx-[1px]" onClick={handleRelatedProductClick}>

      <Link to={`/product/${productId}`}>
        <img src={`${server}/${photo}`} alt={name} className="w-[350px] h-40 md:h-56 rounded-t-md" />
        <p className="line-clamp-2 text-center  font-semibold">{name}</p>
        <span className="span">${price}{" "}<span className="cutPrice">{cutPrice > 0 ? `$${cutPrice}` : ""}</span></span>
        <br />
        <span className="fa fa-star text-orange-500 text-clip "></span> (2.1){" "}
        <span className="">Reviews (33)</span>
      </Link>

    </div>
  );
};

export default ProductCard;
