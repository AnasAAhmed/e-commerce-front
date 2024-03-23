import { server } from "../redux/store";
import { Link } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  cutPrice: number;
  loading?: boolean;
  // stock: number;
  // handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  cutPrice,
  name,
  photo,
  loading,
  // stock,
  // handler,
}: ProductsProps) => {
  return (
    <>
      {loading ? (
        <>
          <div className="productCard-skeleton">
            <div></div>
            <p></p>
            <span className="span"></span>
            <br />
          </div>
        </>
      ) : (
        <div className="product-card">
          <Link to={`/product/${productId}`}>
            <img src={`${server}/${photo}`} alt={"Product"} />
            <p className="truncate-name">{name}</p>
            <span className="span">${price}{" "}<span className="cutPrice">{cutPrice > 0 ? `$${cutPrice}`:""}</span></span>
            <br />
            <span className="fa fa-star checked"></span> (2.1){" "}
            <span className="">Reviews (33)</span> 
            <div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductCard;
