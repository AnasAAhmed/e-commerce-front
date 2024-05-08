import { useLatestCategoryProductsQuery } from '../redux/api/productAPI';
import ProductCard from './product-card';
import { Link } from 'react-router-dom';
import { ProductCardLoader } from './loader';

type CategoryProductsProps = {
  category: string;
  heading?: string;
  filteredProductId?: string;
};

const RelatedProducts = ({ category, heading, filteredProductId }: CategoryProductsProps) => {
  const { data, isLoading, isError } = useLatestCategoryProductsQuery({ category: category }); // Pass the category name

  if (isError) return <div>Error: Cannot Fetch the Products</div>;

  const filteredProducts = data?.products.filter(product => product._id !== filteredProductId)

  return (
    <div>
      <h1 className='text-4xl mb-12 flex items-center justify-center'>{heading}</h1>
      <main className='sm:flex sm:flex-wrap grid grid-cols-2 justify-center gap-4 sm:gap-16'>
        {isLoading ? (
          <ProductCardLoader />
        ) : (
          filteredProducts?.length === 0 || data?.products.length === 0 ? (
            <p className="font-bold text-4xl h-[260px]">No products found</p>
          ) : (
            filteredProducts?.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                photo={product.photo}
                numOfReviews={product.numOfReviews}
                ratings={product.ratings}
                cutPrice={product.cutPrice}
                size={product.size ? product.size[0] : ""}
                color={product.color ? product.color[0] : ""}
                style={product.style ? product.style[0] : ""}
                stock={product.stock}
              />
            ))
          )
        )}
      </main>
      {heading && (
        <h1 className='text-2xl my-6 flex items-center justify-center'>
          <Link to={`/search/${category}`} onClick={() => window.scrollTo(0, 0)}>
            More
          </Link>
        </h1>

      )}
    </div>
  );
};

export default RelatedProducts;