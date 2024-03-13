
import { useLatestCategoryProductsQuery } from '../redux/api/productAPI'; // Import the hook
import ProductCard from './product-card';
import { Skeleton } from './loader';
import { Link } from 'react-router-dom';


type CategoryProductsProps = {
  category: string;
  heading: string;
  // handler: (cartItem: CartItem) => string | undefined;
};

const CatgoryProducts = ({ category,heading }: CategoryProductsProps) => {
  const { data, isLoading, isError } = useLatestCategoryProductsQuery({ category: category }); // Pass the category name

  if (isError) return <div>Error: Cannot Fetch the Products</div>;

  return (
    <div className="homee">

      <h1>
         {heading}
         <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              // stock={i.stock}
              // handler={handler}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default CatgoryProducts