import { server } from "../redux/store";
import { Link } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  loading?: boolean;
  // stock: number;
  // handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  loading
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

            <img src={`${server}/${photo}`} alt={name} />
            <p>{name}</p>
            <span className="span">${price}</span>
            <br />
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductCard;
