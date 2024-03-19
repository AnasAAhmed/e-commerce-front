import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ProductLoader } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import CatgoryProducts from "../components/CategoryProducts";



const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");





  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <>
      <div className="home">
        <section>

        </section>
        <h1>
          Latest Products
          <Link to="/search" className="findmore">
            More
          </Link>
        </h1>

        <main>
          {isLoading ? (
            <ProductLoader />
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                photo={i.photo}
              />
            ))
          )}
        </main>
      </div>
      <br />
      <CatgoryProducts heading="Latest Laptop's" category="laptop" />
      <br />
      <CatgoryProducts heading="Latest Mobile's" category="mobile" />
      <br />
      <CatgoryProducts heading="Latest Wearables" category="wearables" />
      <br />
    </>
  );
};

export default Home;
