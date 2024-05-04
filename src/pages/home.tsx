import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import heroImg from '../assets/Ecommerce.png'
import CollectionsList from "../components/CollectionsList";
import RelatedProducts from "../components/RelatedProducts";
import { ProductCardLoader } from "../components/loader";



const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");





  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <>
      <div>
        <section className="bg-center bg-cover">
          <img src={heroImg} className="w-full h-[60vh]" alt="heroImg" />
        </section>
        <CollectionsList />
        <h1 className="text-4xl my-8 flex items-center justify-center">Latest Products</h1>
        <div className="flex flex-col items-center gap-10 py-8 px-5">
          <div className="flex flex-wrap justify-center gap-16 ">
            {isLoading ? (
             <ProductCardLoader />
            ) : (
              !data?.products || data?.products.length === 0 ? (
                <p className="text-body-bold">No products found</p>
              ) : (
                data?.products.map((i) => (
                  <ProductCard
                    key={i._id}
                    productId={i._id}
                    name={i.name}
                    price={i.price}
                    photo={i.photo}
                    cutPrice={i.cutPrice}
                  />
                ))
              )
            )}
          </div>
        </div>
        <h1 className="text-2xl my-6 flex items-center justify-center">
          <Link to="/search" >
            More
          </Link>
        </h1>
        <div className="flex flex-col items-center   px-5">
          <RelatedProducts category={"camera"} heading="Camera's" />
        </div>
        <div className="flex flex-col items-center   px-5">
          <RelatedProducts category={"laptop"} heading="Laptop's" />
        </div>

      </div>
    </>
  );
};

export default Home;
