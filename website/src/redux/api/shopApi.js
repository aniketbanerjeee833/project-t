import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
  tagTypes: ["Shipping", "Purchase"],
  endpoints: (builder) => ({

    addShipping: builder.mutation({
      query: (body) => ({ url: "user/shop/shipping/add", method: "POST", body }),
      invalidatesTags: ["Shipping"],
    }),

    addPurchase: builder.mutation({
      query: (body) => ({ url: "user/shop/purchase/add", method: "POST", body }),
      invalidatesTags: ["Purchase"],
    }),
     getAllDiscounts: builder.query({
      query: () => `admin/product/all-discounts`,
   
    }),
    getAllShippingPrices: builder.query({
      query: () => `admin/product/all-shipping-prices`,
    
    }),
     getAllProducts: builder.query({
      query: () => `admin/product/all-products`,
      
    }),
    // getAllShipping: builder.query({
    //   query: () => "/shipping/all",
    //   providesTags: ["Shipping"],
    // }),

    // getAllPurchase: builder.query({
    //   query: () => "/purchase/all",
    //   providesTags: ["Purchase"],
    // }),

    getShippingByInId: builder.query({
      query: (inId) => `user/shop/shipping/${inId}`,
    }),

  }),
});

export const {
  useAddShippingMutation,
  useAddPurchaseMutation,
 
  useGetShippingByInIdQuery,
  useGetAllDiscountsQuery,
  useGetAllShippingPricesQuery,
  useGetAllProductsQuery
} = shopApi;