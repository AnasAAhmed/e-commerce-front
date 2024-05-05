import { server } from "../redux/store";
import { Link } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  cutPrice: number;
};

const ProductCard = ({
  productId,
  price,
  cutPrice,
  name,
  photo,
}: ProductsProps) => {
  return (
    <Link to={`/product/${productId}`} className="w-[220px] flex flex-col gap-2">
      <img src={`${server}/${photo}`} alt={name} width={250} height={300} className="h-[250px] rounded-lg object-cover" />
      <p className="line-clamp-2 min-h-[3rem] w-full font-semibold mx-2">{name}</p>
      <span className="text-lg font-semibold mx-2">${price}{" "}<span className="text-sm line-through text-red-500 ">{cutPrice > 0 ? `$${cutPrice}` : ""}</span></span>
      <div className="flex flex-row items-center justify-between mx-2">
        <p className="fa fa-star text-orange-500 text-clip">(2.1)</p>
        <p className="font-semibold ">Reviews (33)</p>
      </div>
    </Link>
  );
};

export default ProductCard;

