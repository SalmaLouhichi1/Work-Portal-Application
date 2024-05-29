import React, {useState, useEffect} from "react";
import { Box, useTheme, IconButton, Snackbar, Alert, Tooltip } from "@mui/material";
import { useGetWashingContractorQuery, useDeleteUserMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import  UpdateOutlinedIcon  from "@mui/icons-material/UpdateOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const WashingContractor = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetWashingContractorQuery();
  
  console.log("data", data);

  const [deleteUserMutation] = useDeleteUserMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Check for success message in URL query params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get('message');

  useEffect(() => {
    if (isError) {
      setSnackbarMessage("You don't have access to the Washing Contractors page");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      navigate(`/dashboard?message=${encodeURIComponent('Access to Washing Contractors page is Forbidden')}`);
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
    navigate("/adduser");
  };

  const handleDelete = async (id) => {
    try {
      // Call the delete mutation with the expedition ID
      await deleteUserMutation(id);
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
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 0.5,
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
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          aria-label="Update"
          onClick={() => navigate(`/updateUser/${params.row._id}`)}
        >
          <UpdateOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Washing Contractors" subtitle="Managing Washing Contractors' list" />
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
        <Tooltip title="Add User">
          <IconButton onClick={handleAdd}>
            <PersonAddAltIcon/>
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

export default WashingContractor;