import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "SuperAdmins",
    "Dashboard",
    "Receptions",
    "Manufacture",
    "Expedition",

  ],
  endpoints: (build) => ({
    getUserById: build.query({
      query: (userId) => `api/user/${userId}`, 
      providesTags: ["User"],
    }),
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: (id) => `products/products/${id}`,
      providesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `products/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `products/products/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Landering"],
    }),
    getProductById: build.query({
      query: (id) => `products/product/${id}`, 
      providesTags: ["product"],
    }),
    getProductStat: build.query({
      query: (id) => `products/productstat/${id}`,
      providesTags: ["ProductStat"],
    }),
    updateProductStat: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `products/productstat/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["ProductStat"],
    }),
    
    getTransactions: build.query({
      query: ({ page = 1, pageSize = 20, sort = {}, search = '' }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort: JSON.stringify(sort), search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getTLSAdmins: build.query({
      query: () => "management/tlsadmin",
      providesTags: ["TLSAdmin"],
    }),
   
    getWashingContractor: build.query({
      query: () => "management/washingcontractor",
      providesTags: ["WashingContractor"],
    }),
    getSewingContractor: build.query({
      query: () => "management/sewingcontractor",
      providesTags: ["SewingContractor"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `management/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `management/user/${id}`,
        method: "PUT",
        body: updatedData, 
      }),
      invalidatesTags: ["User"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getReceptions: build.query({
      query: () => "receptions/receptions",
      providesTags: ["Receptions"],
    }),
    getManufacture: build.query({
      query: () => "manufacture/manufacture",
      providesTags: ["Manufacture"],
    }),
    getExpedition: build.query({
      query: () => "expedition/expedition",
      providesTags: ["Expedition"],
    }),
    deleteExpedition: build.mutation({
      query: (id) => ({
        url: `expedition/expedition/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expedition'],
    }),
    deleteReception: build.mutation({
      query: (id) => ({
        url: `receptions/receptions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Receptions'],
    }),
    deleteManufacture: build.mutation({
      query: (id) => ({
        url: `manufacture/manufacture/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Manufacture'],
    }),
    updateExpedition: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `expedition/expedition/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Expedition"],
    }),
    updateManufacture: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `manufacture/manufacture/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Manufacture"],
    }),
    updateReceptions: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `receptions/receptions/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Receptions"],
    }),
    getReceptionById: build.query({
      query: (id) => `receptions/receptions/${id}`, 
      providesTags: ["Reception"],
    }),
    getManufactureById: build.query({
      query: (id) => `manufacture/manufacture/${id}`, 
      providesTags: ["Manufacture"],
    }),
    getExpeditionById: build.query({
      query: (id) => `expedition/expedition/${id}`, 
      providesTags: ["Expedition"],
    }),
    getLandering: build.query({
      query: () => "landering/landering",
      providesTags: ["Landering"],
    }),
    deleteLandering: build.mutation({
      query: (id) => ({
        url: `landering/landering/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Landering'],
    }),
    updateLandering: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `landering/landering/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Landering"],
    }),
    getLanderingById: build.query({
      query: (id) => `landering/landering/${id}`, 
      providesTags: ["Landering"],
    }),
  }),
});

export const {
  useGetUserByIdQuery, 
  useGetUserQuery,
  useGetProductsQuery,
  useGetTLSAdminsQuery,
  useGetSewingContractorQuery,
  useGetWashingContractorQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetDashboardQuery,
  useGetUserPerformanceQuery,
  useGetReceptionsQuery,
  useGetManufactureQuery,
  useGetExpeditionQuery,
  useDeleteExpeditionMutation,
  useDeleteReceptionMutation,
  useDeleteManufactureMutation,
  useUpdateExpeditionMutation,
  useUpdateManufactureMutation,
  useUpdateReceptionsMutation,
  useGetReceptionByIdQuery,
  useGetManufactureByIdQuery,
  useGetExpeditionByIdQuery,
  useGetLanderingQuery,
  useGetLanderingByIdQuery,
  useDeleteLanderingMutation,
  useUpdateLanderingMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetProductStatQuery,
  useUpdateProductStatMutation,
} = api;