import React from "react";
import { Box, useTheme, IconButton, Tooltip } from "@mui/material";
import { useGetReceptionsQuery, useDeleteReceptionMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Receptions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isLoading } = useGetReceptionsQuery();
  console.log("data", data);

  const[deleteReceptionMutation]= useDeleteReceptionMutation();

  const handleAdd = () => {
    navigate("/CreateReception");
  };

  const handleDelete = async (id) => {
    try {
      // Call the delete mutation with the expedition ID
      await deleteReceptionMutation(id);
      console.log('Deleted successfully');
    } catch (error) {
      console.error('Error deleting reception:', error.message);
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "OFnumber",
      headerName: "OF Number",
      flex: 1,
    },
    {
      field: "RequestDate",
      headerName: "Request Date",
      flex: 1,
    },
    {
      field: "ExpectedDeliveryDate",
      headerName: "Expected Delivery Date",
      flex: 1,
    },
    {
      field: "RemainingQuantityToBeReceived",
      headerName: "Remaining Quantity To Be Received",
      flex: 1,
    },
    {
      field: "QuantityShipped",
      headerName: "Quantity Shipped",
      flex: 1,
    },
    {
      field: "QuantityStillToBeDelivered",
      headerName: "Quantity Still To Be Delivered",
      flex: 1,
    },
    {
        field: "Article",
        headerName: "Article",
        flex: 1,
      },
      {
        field: "Maker",
        headerName: "Maker",
        flex: 1,
      },
      {
        field: "Country",
        headerName: "Country",
        flex: 1,
      },
      {
        field: "Delete",
        headerName: "Delete",
        flex: 1,
        renderCell: (params) => (
          <IconButton
            aria-label="Delete"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        ),
      },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="RECEPTIONS" subtitle="Receptions Management" />
      <Box
        display="flex"
        justifyContent="flex-end"
        mb="1rem"
      >
        <Tooltip title="Add Reception">
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        mt="40px"
        height="75vh"
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Receptions;