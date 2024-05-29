import React, { useState, useEffect } from 'react';
import { Box, useTheme, IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import { useGetReceptionsQuery, useDeleteReceptionMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import  UpdateOutlinedIcon  from "@mui/icons-material/UpdateOutlined";
import AddIcon from '@mui/icons-material/Add';

const Receptions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const result = useGetReceptionsQuery();
  console.log(result);
  const {data, isLoading, isError} =result;
  

  const [deleteReceptionMutation] = useDeleteReceptionMutation();
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Check for success message in URL query params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get('message');

  useEffect(() => {
    if (isError) {
      setSnackbarMessage("You don't have access to the receptions page");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      navigate(`/dashboard?message=${encodeURIComponent('Access to Receptions page is Forbidden')}`);
    }
  }, [isError, navigate]);
  useEffect(() => {
    if (successMessage) {
      setSnackbarMessage(successMessage);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  }, [successMessage]);

  const handleAdd = () => {
    navigate("/CreateReception");
  };

  const handleDelete = async (id) => {
    try {
      await deleteReceptionMutation(id);
      setSnackbarMessage('Reception deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting reception:', error.message);
      setSnackbarMessage('Error deleting reception');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
      {
        field: "Update",
        headerName: "Update",
        flex: 1,
        renderCell: (params) => (
          <IconButton
            aria-label="Update"
            onClick={() => navigate(`/updateReceptions/${params.row._id}`)}
          >
            <UpdateOutlinedIcon />
          </IconButton>
        ),
      },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="RECEPTIONS" subtitle="Receptions Management" />
      <Snackbar open={snackbarOpen} autoHideDuration={10000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '200%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
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