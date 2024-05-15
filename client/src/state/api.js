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
      query: (userId) => `api/user/${userId}`, // Include userId in the query
      providesTags: ["User"],
    }),
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
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
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
   
    getSuperAdmins: build.query({
      query: () => "management/superadmins",
      providesTags: ["SuperAdmins"],
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
    /* getupdateExpedition: build.mutation({
      query: (rowId, updatedData) => ({
        url: `expedition/${rowId}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Expedition'],
    }), */
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
  }),
});

export const {
  useGetUserByIdQuery, 
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetDashboardQuery,
  useGetSuperAdminsQuery,
  useGetReceptionsQuery,
  useGetManufactureQuery,
  useGetExpeditionQuery,
  //useGetupdateExpeditionMutation,
  useDeleteExpeditionMutation,
  useDeleteReceptionMutation,
  useDeleteManufactureMutation,
  useUpdateExpeditionMutation,
} = api;