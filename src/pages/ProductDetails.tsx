import { Navigate, useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "../components/loader";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch } from "react-redux";
import {
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import ProductReview from "../components/ProductReviews";
import StarRatings from "../components/StarsRatings";
import Footer from "../components/Footer";
import ImageZoom from "../components/ImageZoom";

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [style, setStyle] = useState("");

  const params = useParams();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);
  const { _id: productId, price, cutPrice, description, photo, ratings, numOfReviews, name, stock, category, size: sizes, color: colors, style: styles } = data?.product || {
    _id: "",
    photo: "",
    category: "",
    description: "",
    name: "",
    stock: 0,
    price: 0,
    ratings: 0,
    numOfReviews: 0,
    cutPrice: 0,
    size: [],
    color: [],
    style: []
  };
  const dispatch = useDispatch();


  const sizeArray = Array.isArray(sizes) ? sizes : (sizes as string).split(',');
  const colorArray = Array.isArray(colors) ? colors : (colors as string).split(',');
  const styleArray = Array.isArray(styles) ? styles : (styles as string).split(',');


  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  
  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
  }, [params.id])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400)
    setSize(sizeArray[0]);
    setColor(colorArray[0]);
    setStyle(styleArray[0]);
  }, [data])

  if (isError) return <Navigate to={"/404"} />;


  return (
    <>
      <div>
        <main className="product-details flex flex-col md:flex-row px-6 md:px-3  justify-center mt-8">
          {isLoading || loading ? (
            <ProductDetailsSkeleton />
          ) : (
            <>
              <section className="sec1 flex-1 flex-shrink-0 w-full md:w-72 mr-10 mb-10">
                <img src={`${server}/${photo}`} alt={name} className="w-full shadow-md md:hidden md:h-[400px] h-[250px] object-cover" />
                <ImageZoom src={`${server}/${photo}`} alt={name} />
              </section>
              <article className="sec2 flex-1 w-full  md:w-96">
                <p className="min-h-16 text-2xl font-semibold mb-4">{name}</p>
                {sizeArray.length > 1 &&
                  <div className="flex mb-4">
                    {sizeArray.map((item, index) => (
                      <button
                        key={index}
                        className={`${size === item ? "bg-black text-white" : "bg-white text-gray-800"} text-gray-800 px-2 py-1 mr-2 rounded-md`}
                        onClick={() => setSize(item)}
                      >{item}</button>
                    ))}
                  </div>
                }
                {colorArray.length > 1 &&
                  <div className="flex mb-4">
                    {colorArray.map((item, index) => (
                      <button
                        key={index}
                        className={`${color === item ? "ring-4" : ""} rounded-full h-6 w-6 mx-1`}
                        style={{ backgroundColor: item }}
                        onClick={() => setColor(item)}
                      ></button>
                    ))}
                  </div>
                }
                {styleArray.length > 0 &&
                  <div className="flex flex-wrap mb-4">
                    {styleArray.map((item, index) => (
                      <button
                        key={index}
                        className={`${style === item ? "bg-black text-white" : "bg-white text-gray-800"} mt-2 text-gray-800 px-2 py-1 mr-2 rounded-md`}
                        onClick={() => setStyle(item)}
                      >{item}</button>
                    ))}
                  </div>
                }
                <span className="text-lg flex flex-row">
                  <StarRatings rating={ratings} /> Reviews ({numOfReviews})
                </span>


                <br />
                {stock > 0 ? (
                  <>
                    {stock < 6 ? (
                      <span className="text-red-500">Low Stock</span>
                    ) : (
                      <span className="text-green-500"> Available</span>
                    )}
                  </>
                ) : (
                  <span className="text-red-500">Not Available</span>
                )}
                <br />
                <h3 className="text-lg font-semibold my-2">Description:</h3>
                <p >{description}</p>
                <h3 className="text-2xl">
                  ${price}
                  <span className="text-lg line-through text-red-500">{cutPrice > 0 ? `$${cutPrice}` : ""}</span>
                </h3>
                <button
                  className='cart-button w-full mt-4 px-4 py-2 bg-yellow-500 rounded-md text-white text-lg font-semibold transition duration-300 ease-in-out hover:bg-yellow-600'
                  onClick={() =>
                    addToCartHandler({ productId, size, color, style, price, cutPrice, name, photo, stock, quantity: 1 })
                  }
                >
                  Add to Cart
                </button>
              </article>
            </>
          )}
        </main>
        <div>
          <ProductReview numOfReviews={numOfReviews} productId={productId} />
        </div>
        <div className="flex justify-center items-center">
          <RelatedProducts filteredProductId={productId} category={category} heading="Related Products" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;





