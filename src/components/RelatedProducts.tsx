
import { useLatestCategoryProductsQuery } from '../redux/api/productAPI'; 
import {  ProductLoader } from './loader';
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
      <main className='w-full flex justify-center flex-wrap gap-2'>
        {isLoading ? (
          <ProductLoader/>
        ) : (
          <>
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
          </>
        )
        }

      </main>
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