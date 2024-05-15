import React from "react";
import { Box, useTheme, IconButton, Tooltip } from "@mui/material";
import { useGetExpeditionQuery, useDeleteExpeditionMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
//import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import  UpdateOutlinedIcon  from "@mui/icons-material/UpdateOutlined";

const Expedition = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isLoading } = useGetExpeditionQuery();

  const [deleteExpeditionMutation] = useDeleteExpeditionMutation();
  //const [updateExpeditionMutation] = useUpdateExpeditionMutation();
  
  console.log("data", data);

  const handleAdd = () => {
    navigate("/CreateExpedition");
  };

  const handleDelete = async (id) => {
    try {
      // Call the delete mutation with the expedition ID
      await deleteExpeditionMutation(id);
      console.log('deleted successfully');
    } catch (error) {
      console.error(error.message);
    }
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
      <Header title="EXPEDITION" subtitle="Expedition Management" />
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