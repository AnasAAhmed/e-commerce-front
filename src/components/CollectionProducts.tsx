import { FaSpinner } from 'react-icons/fa';
import { useLatestCollectionsProductsQuery } from '../redux/api/productAPI';
import ProductCard from './product-card';


type CollectionProductsProps = {
  collection: string;
  heading: string;
};

const CollectionProducts = ({ collection, heading }: CollectionProductsProps) => {

  const { data, isLoading, isError } = useLatestCollectionsProductsQuery({ collections: collection });



  if (isError) return <div>Error: Cannot Fetch the Products</div>;

  return (
    <div className="homee">
      <h1 className='text-4xl my-8 flex items-center justify-center'>{heading}</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-[20.4rem]">
          <FaSpinner className="animate-spin h-20 w-20 text-gray-500" />
        </div>
      ) : (
        <main className='w-full flex justify-center flex-wrap gap-2'>
          {data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              photo={i.photo}
              cutPrice={i.cutPrice}
            />
          ))}
        </main>
      )}

    </div>
  )
}

export default CollectionProducts
