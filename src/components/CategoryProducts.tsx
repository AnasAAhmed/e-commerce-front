
import { useLatestCategoryProductsQuery } from '../redux/api/productAPI'; // Import the hook
import ProductCard from './product-card';
import { Skeleton } from './loader';


type CategoryProductsProps = {
  categories: string;
  heading: string;
  // handler: (cartItem: CartItem) => string | undefined;
};

const CatgoryProducts = ({ categories,heading }: CategoryProductsProps) => {
  const { data, isLoading, isError } = useLatestCategoryProductsQuery({ category: categories }); // Pass the category name

  if (isError) return <div>Error: Cannot Fetch the Products</div>;

  return (
    <div className="homee">

      <h1>
         {heading}
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