import React, {useState, useEffect} from "react";
import { Box, useTheme, IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import { useGetExpeditionQuery, useDeleteExpeditionMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import  UpdateOutlinedIcon  from "@mui/icons-material/UpdateOutlined";


const Expedition = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const result = useGetExpeditionQuery();
  console.log(result);
  const {data, isLoading, isError} = result;

  const [deleteExpeditionMutation] = useDeleteExpeditionMutation();
  //const [updateExpeditionMutation] = useUpdateExpeditionMutation();
  
  console.log("data", data);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Check for success message in URL query params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get('message');

  useEffect(() => {
    if (isError) {
      setSnackbarMessage("You don't have access to the expedition page");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      navigate(`/dashboard?message=${encodeURIComponent('Access to Expedition page is Forbidden')}`);
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
    navigate("/CreateExpedition");
  };

  const handleDelete = async (id) => {
    try {
      // Call the delete mutation with the expedition ID
      await deleteExpeditionMutation(id);
      console.log('deleted successfully');
      setSnackbarMessage('Expedition deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error.message);
      setSnackbarMessage('Error deleting expedition');
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
      field: "State",
      headerName: "State",
      flex: 1,
    },
    {
      field: "DispatchDate",
      headerName: "Dispatch Date",
      flex: 1,
    },
    {
      field: "ShippingNumber",
      headerName: "ShippingNumber",
      flex: 1,
    },
    {
      field: "UpdatedDate",
      headerName: "UpdatedDate",
      flex: 1,
    },
    {
      field: "TransportDate",
      headerName: "Transport Date",
      flex: 1,
    },
    {
      field: "Destination",
      headerName: "Destination",
      flex: 1,
    },
    {
        field: "NumberOfItemsSent",
        headerName: "Number Of Items Sent",
        flex: 1,
      },
      {
        field: "Comment",
        headerName: "Comment",
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
            onClick={() => navigate(`/updateExpedition/${params.row._id}`)}
          >
            <UpdateOutlinedIcon />
          </IconButton>
        ),
      },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="EXPEDITION -Sewing Subcontractor" subtitle="Expedition Management" />
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
        <Tooltip title="Add Expedition">
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

export default Expedition;