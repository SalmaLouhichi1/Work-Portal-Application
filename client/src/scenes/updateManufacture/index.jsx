import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateManufactureMutation, useGetManufactureByIdQuery } from 'state/api';
import {  Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

const UpdateManufacture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: manufacture, isLoading, isError } = useGetManufactureByIdQuery(id);
  const [updateManufactureMutation] = useUpdateManufactureMutation();
  const [formData, setFormData] = useState({
    OFnumber: '',
    RequestDate: '',
    ExpectedDeliveryDate: '',
    RemainingQuantityToBeReceived: '',
    QuantityShipped: '',
    QuantityStillToBeDelivered: '',
    Article: '',
    Maker: '',
    Country: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (manufacture) {
      setFormData({
        OFnumber: manufacture.OFnumber || '',
        RequestDate: manufacture.RequestDate || '',
        ExpectedDeliveryDate: manufacture.ExpectedDeliveryDate || '',
        RemainingQuantityToBeReceived: manufacture.RemainingQuantityToBeReceived || '',
        QuantityShipped: manufacture.QuantityShipped || '',
        QuantityStillToBeDelivered: manufacture.QuantityStillToBeDelivered || '',
        Article: manufacture.Article || '',
        Maker: manufacture.Maker || '',
        Country: manufacture.Country || ''
      });
    }
  }, [manufacture]);

  useEffect(() => {
    if (snackbarOpen) {
      const timer = setTimeout(() => {
        setSnackbarOpen(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [snackbarOpen]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateManufactureMutation({ id, updatedData: formData });
      console.log('Manufacture updated successfully');
      setSnackbarMessage('Reception updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate(`/manufacture?message=${encodeURIComponent('Manufacture updated successfully')}`);
    } catch (error) {
      console.error('Error updating manufacture', error.message);
      setSnackbarMessage('Error updating manufacture');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error loading manufacture data</div>;


  return (
    <div>
      
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box 
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar key="avatar" sx={{m:1, bgcolor: 'secondary.main'}}>
            <UpdateOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            <h1>Update Manufacture</h1>
            </Typography>
            <p>Manufacture ID: {id}</p>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-State"
                    name="OFnumber"
                    required
                    fullWidth
                    id="OFnumber"
                    label="OFnumber"
                    autoFocus
                    value={formData.OFnumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="RequestDate"
                    label="Request Date"
                    name="RequestDate"
                    autoComplete="RequestDate"
                    value={formData.RequestDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="ExpectedDeliveryDate"
                    label="Expected Delivery Date"
                    name="ExpectedDeliveryDate"
                    autoComplete="ExpectedDeliveryDate"
                    value={formData.ExpectedDeliveryDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="RemainingQuantityToBeReceived"
                    label="Remaining Quantity To Be Received"
                    name="RemainingQuantityToBeReceived"
                    autoComplete="RemainingQuantityToBeReceived"
                    value={formData.RemainingQuantityToBeReceived}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="QuantityShipped"
                    label="Quantity Shipped"
                    name="QuantityShipped"
                    autoComplete="QuantityShipped"
                    value={formData.QuantityShipped}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="QuantityStillToBeDelivered"
                    label="Quantity Still To Be Delivered"
                    name="QuantityStillToBeDelivered"
                    autoComplete="QuantityStillToBeDelivered"
                    value={formData.QuantityStillToBeDelivered}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="Article"
                    label="Article"
                    name="Article"
                    autoComplete="Article"
                    value={formData.Article}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="Maker"
                    label="Maker"
                    name="Maker"
                    autoComplete="Maker"
                    value={formData.Maker}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="Country"
                    label="Country"
                    name="Country"
                    autoComplete="Country"
                    value={formData.Country}
                    onChange={handleInputChange}
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb:2}}
              >
                Update
              </Button>
            </Box>
          </Box>
          <Snackbar open={snackbarOpen} autoHideDuration={10000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
           </Alert>
         </Snackbar>
        </Container>
    </div>
  );
};

export default UpdateManufacture;