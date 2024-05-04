import { useParams } from "react-router-dom";
import { useLatestCollectionsProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import ProductCard from "../components/product-card";


const Collections = () => {

    const params = useParams()

    const { data, isLoading, isError } = useLatestCollectionsProductsQuery({ collection: params.collection!, });

    if (isError) toast.error("Cannot Fetch the Products");

    return (
        <div>
            <h1 className="text-4xl my-8 flex items-center justify-center">{params.collection!.toUpperCase()}'s</h1>
            {isLoading ? (
                <div className="flex items-center justify-center h-[20.4rem]">
                    <FaSpinner className="animate-spin h-20 w-20 text-gray-500" />
                </div>
            ) : (
                <div className="flex flex-col items-center gap-10 py-8 px-5">
                    {!data?.productCollection || data?.productCollection.length === 0 ? (
                        <p className="text-body-bold">No products found</p>
                    ) : (
                        <div className="flex flex-wrap justify-start gap-16">
                            {data?.productCollection.map((i) => (
                                <ProductCard
                                    key={i._id}
                                    productId={i._id}
                                    name={i.name}
                                    price={i.price}
                                    photo={i.photo}
                                    cutPrice={i.cutPrice}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Collections
