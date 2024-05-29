import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // values to be sent to the backend
  //const [page, setPage] = useState(0);
  //const [pageSize, setPageSize] = useState(20);
  //const [sort, setSort] = useState({});
  //const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  /*const result = useGetTransactionsQuery();
  console.log(result);*/
  const { data, isLoading, isError } = useGetTransactionsQuery({
    page: 1, // Initial page
    pageSize: 20, // Initial pageSize
    sort: {}, // Initial sort
    search: searchInput,
  });
  if(isError){
    navigate("/dashboard");
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id} // Assuming _id is the unique identifier for each row
          loading={isLoading || !data}
          rows={data?.transactions || []}
          columns={columns}
          rowCount={data?.total || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          onPageChange={(newPage) => console.log(newPage)}
          onPageSizeChange={(newPageSize) => console.log(newPageSize)}
          onSortModelChange={(newSortModel) => console.log(newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{ toolbar: { searchInput, setSearchInput } }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;