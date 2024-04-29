import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ProductLoader } from "../components/loader";
import ProductCard from "../components/product-card";
import {  useLatestProductsQuery } from "../redux/api/productAPI";
import CollectionProducts from "../components/CollectionProducts";
import heroImg from '../assets/Ecommerce.png'



const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
 




  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <>
      <div className="home">
        <section className="bg-center bg-cover">
          <img src={heroImg} className="w-full h-[60vh]" alt="heroImg" />
        </section>
        <h1 className="text-4xl my-8 flex items-center justify-center">Latest Products</h1>
        <main className="w-full flex justify-center flex-wrap gap-2">
        {isLoading ? (
          <ProductLoader />
        ) : (
          <>
          { data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                photo={i.photo}
                cutPrice={i.cutPrice}
              />
            ))}
            </>
          )
          }
        </main>
        <h1 className="text-2xl">
          <Link to="/search" className="flex items-center justify-center">
            More
          </Link>
        </h1>
      </div>
      <br />
      <CollectionProducts heading="Pc's & Laptops" collection="computers"  />
      <br />
      <CollectionProducts heading="Men's" collection="men" />
      <br />
      {/* <CollectionProducts heading="Womens" collection="women" /> */}
      <br />
    </>
  );
};

export default Home;
