import { useState } from "react";
import ProductCard from "../components/product-card";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { SearchProductLoader } from "../components/loader";

import { RiFilterFill } from "react-icons/ri";
import { useParams } from "react-router-dom";

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

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <aside className="flex-1 p-4 min-w-[20vh] md:max-w-[40vh]">
        <h2 className="text-lg font-semibold mb-4">
          Filters <RiFilterFill className="inline-block" />
        </h2>
        <div className="mb-4">
          <h4 className="text-base mb-2">Sort</h4>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div className="mb-4">
          <h4 className="text-base mb-2">Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={1}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <h4 className="text-base mb-2">Category</h4>
          <select
            className="w-full p-2 border border-gray-300 rounded"
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
      </aside>
      <main className="flex-2 p-4">
        <h1 className="text-2xl font-semibold mb-4">Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-11/12 p-4 border border-gray-300 rounded-lg mb-4"
        />

        {productLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SearchProductLoader />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchedData?.products.map((i) => (
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

        {searchedData && searchedData.totalPage > 1 && (
          <article className="flex justify-center items-center mt-4">
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className={`px-4 py-2 ${isPrevPage?'bg-violet-500':'bg-gray-400'} text-white rounded mr-2`}
            >
              Prev
            </button>
            <span className="text-base">
              {page} of {searchedData.totalPage}
            </span>
            <button
              disabled={isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className={`px-4 py-2 ${!isNextPage?'bg-violet-500':'bg-gray-400'} text-white rounded ml-2`}
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

