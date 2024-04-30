
import { FaSpinner } from 'react-icons/fa';
import { useLatestCategoryProductsQuery } from '../redux/api/productAPI';
import ProductCard from './product-card';
import { Link } from 'react-router-dom';

type CategoryProductsProps = {
  category: string;
  heading?: string;
  handleRelatedProductClick?: any;
  filteredProductId?: string;
};

const RelatedProducts = ({ category, heading, handleRelatedProductClick, filteredProductId }: CategoryProductsProps) => {
  const { data, isLoading, isError } = useLatestCategoryProductsQuery({ category: category }); // Pass the category name

  if (isError) return <div>Error: Cannot Fetch the Products</div>;

  // Filter out product if filteredProductId is provided
  const filteredProducts = filteredProductId
    ? data?.products.filter(product => product._id !== filteredProductId)
    : data?.products;

  return (
    <div className="homee">
      <h1 className='text-4xl my-8 flex items-center justify-center'>{heading}</h1>
        {isLoading ? (
          <div className="flex items-center justify-center h-[30.8rem]">
            <FaSpinner className="animate-spin h-36 w-36 text-gray-500" />
          </div>
        ) : (
          <main className='w-full sm:flex sm:justify-center sm:flex-wrap gap-2 grid grid-cols-2 '>
          {filteredProducts?.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              photo={product.photo}
              cutPrice={product.cutPrice}
              handleRelatedProductClick={handleRelatedProductClick}
            />
          ))}
      </main>
        )}
      {heading && (
        <h1 className='text-2xl'>
          <Link to={`/search/${category}`} className="flex items-center justify-center" onClick={() => window.scrollTo(0, 0)}>
            More
          </Link>
        </h1>

      )}
    </div>
  );
};

export default RelatedProducts;