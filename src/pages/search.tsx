import { useEffect, useState } from "react";
import ProductCard from "../components/product-card";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { RiFilterFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Search = () => {
  const params = useParams()

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");


  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState(params.category!);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const isPrevPage = page > 1;
  const isNextPage = searchedData?.totalPage === page;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [sort, category, maxPrice, search, page])

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="flex flex-col  ">
      <h2 className="text-center text-3xl font-semibold mt-10 mb-4 mx-2">
        Filters <RiFilterFill className="inline-block mb-2" />
      </h2>
      <div className="flex flex-col sm:flex-row mx-3 items-center">
        <input
          type="text"
          placeholder="Search by brand or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 px-2 border-none mb-4 sm:mb-0 max-sm:rounded-md sm:rounded-l-md  bg-gray-200 "
        />
        <div className="flex flex-row">

          <select
            className=" h-9 px-2 max-sm:rounded-l-md border-none bg-gray-200 "
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
          <select
            className=" h-9 px-2 border-none rounded-r-md bg-gray-200 "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </div>
      <main className="p-4 flex flex-col items-center ">
        <div className="mb-4">
          <h4 className="text-base mb-2">Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={1}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-60 h-[35px]"
          />
        </div>
        <h1 className="text-2xl font-semibold ">Products</h1>
        <div className="my-5">
          {loading || productLoading ? (
            <div className="flex items-center justify-center h-[25.4rem]">
              <FaSpinner className="animate-spin h-36 w-36 text-gray-500" />
            </div>
          ) : (
            <div className="sm:flex sm:flex-wrap grid grid-cols-2 justify-center gap-4 sm:gap-16 min-h-[90vh]">
              {!searchedData?.products || searchedData?.products.length === 0 ? (
                <p className="font-bold text-4xl">No products found</p>
              ) : (
                searchedData?.products.map((i) => (
                  <ProductCard
                    key={i._id}
                    productId={i._id}
                    name={i.name}
                    price={i.price}
                    photo={i.photo}
                    cutPrice={i.cutPrice}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {searchedData && searchedData.totalPage > 1 && (
          <article className="flex justify-center items-center mt-4">
            <button
              disabled={!isPrevPage}
              onClick={() => { setPage((prev) => prev - 1); window.scroll(0, 0) }}
              className={`px-4 py-2 ${isPrevPage ? 'bg-violet-500' : 'bg-gray-400'} text-white rounded mr-2`}
            >
              Prev
            </button>
            <span className="text-base">
              {page} of {searchedData.totalPage}
            </span>
            <button
              disabled={isNextPage}
              onClick={() => { setPage((prev) => prev + 1); window.scroll(0, 0) }}
              className={`px-4 py-2 ${!isNextPage ? 'bg-violet-500' : 'bg-gray-400'} text-white rounded ml-2`}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;

