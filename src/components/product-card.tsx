import { server } from "../redux/store";
import { Link } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  cutPrice: number;
  handleRelatedProductClick?:any;
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
    <div className="flex flex-col items-center justify-center text-center max-w-[35vh] bg-white shadow-md rounded-lg transition-transform object-cover duration-300 transform hover:-translate-y-2 hover:bg-gray-200 my-4 mx-[1px]" onClick={handleRelatedProductClick}>
      <Link to={`/product/${productId}`}>
        <img src={`${server}/${photo}`} alt={name} className="w-[35vh] h-64 rounded-t-lg" />
        <p className="truncate-name font-semibold">{name}</p>
        <span className="span">${price}{" "}<span className="cutPrice">{cutPrice > 0 ? `$${cutPrice}` : ""}</span></span>
        <br />
        <span className="fa fa-star text-orange-500 text-clip "></span> (2.1){" "}
        <span className="">Reviews (33)</span>
      </Link>
    </div>
  );
};

export default ProductCard;
