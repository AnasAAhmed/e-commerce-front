import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  CollectionProductsResponse,
  CollectionsResponse,
  DeleteProductRequest,
  DeleteReviewRequest,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  ReviewRequest,
  ReviewsResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductRequest,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
        query: () => "latest",
        providesTags: ["product"],
      }),
    latestCategoryProducts: builder.query<AllProductsResponse, { category?: string }>({
      query: ({ category }) => `latest/${category}`, // Fetch latest products by category
      providesTags: ["product"],
    }),
    latestCollectionsProducts: builder.query<CollectionProductsResponse, { collection: string,limit?:number }>({
      query: ({ collection ,limit}) =>{  
        let base = `allcollections/${collection}`;

      if (limit) base += `&limit=${limit}`;

      return base;
    }, // Fetch latest products by collection
      providesTags: ["product"],
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags: ["product"],
    }),
    collections: builder.query<CollectionsResponse, string>({
      query: () => `collections`,
      providesTags: ["product"],
    }),

    searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ["product"],
    }),

    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),

    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    reviews: builder.query<ReviewsResponse, string>({
      query: (ProductId) =>`reviews/${ProductId}`,
      providesTags: ["product"],
    }),
    createReview: builder.mutation<MessageResponse, ReviewRequest>({
      query: ({ formData, productId }) => ({
        url: `new-reviews/${productId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteReview: builder.mutation<MessageResponse, DeleteReviewRequest>({
      query: ({ userId, productId }) => ({
        url: `delete-review?productId=${productId}&id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useLatestCategoryProductsQuery,
  useLatestCollectionsProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useCollectionsQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = productAPI;
