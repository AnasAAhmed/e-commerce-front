import { Navigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/loader";
import CategoryProduct from "../components/CategoryProducts";
import { useDispatch } from "react-redux";
import {
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import { useEffect } from "react";



const ProductDetails = () => {

  const params = useParams();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { _id: productId, price, description, photo, name, stock, category } = data?.product || {
    _id: "",
    photo: "",
    category: "",
    description: "",
    name: "",
    stock: 0,
    price: 0,
  };

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.id])

  
  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="product-container">
      <main className="product-details">
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          <>
            <section className="sec1">
              <img src={`${server}/${photo}`} alt="Product" />
            </section>
            <article className="sec2">
              <p>{name}</p>

              {stock > 0 ? (
                <>
                  {stock < 5 ? (
                    <span className="red">Low Stock</span>
                  ) : (
                    <span className="green"> Available</span>
                  )}
                </>) : (
                <span className="red">Not Available</span>

              )}
              <br />
              <h3>Description</h3>
              <p>{description}</p>
              <br />
              <h3>${price}</h3>
              <button
                className="cart-button"
                onClick={() =>
                  addToCartHandler({ productId, price, name, photo, stock, quantity: 1 })
                }
              >
                Add to Cart
              </button>
            </article>
          </>
        )}
      </main>
      <CategoryProduct category={category} heading={"More of This"} />
    </div>
  );
};

export default ProductDetails


// <span className="fa fa-star checked"></span>
// <span className="fa fa-star checked"></span>
// <span className="fa fa-star checked"></span>
// <span className="fa fa-star"></span>
// <span className="fa fa-star"></span><br />