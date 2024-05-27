import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateReceptionsMutation, useGetReceptionByIdQuery } from 'state/api';
import {  Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

const UpdateReceptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: reception, isLoading, isError } = useGetReceptionByIdQuery(id);
  const [updateReceptionsMutation] = useUpdateReceptionsMutation();
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
    if (reception) {
      setFormData({
        OFnumber: reception.OFnumber || '',
        RequestDate: reception.RequestDate || '',
        ExpectedDeliveryDate: reception.ExpectedDeliveryDate || '',
        RemainingQuantityToBeReceived: reception.RemainingQuantityToBeReceived || '',
        QuantityShipped: reception.QuantityShipped || '',
        QuantityStillToBeDelivered: reception.QuantityStillToBeDelivered || '',
        Article: reception.Article || '',
        Maker: reception.Maker || '',
        Country: reception.Country || ''
      });
    }
  }, [reception]);

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
      await updateReceptionsMutation({ id, updatedData: formData });
      console.log('Reception updated successfully');
      setSnackbarMessage('Reception updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate(`/receptions?message=${encodeURIComponent('Reception updated successfully')}`);

    } catch (error) {
      console.error('Error updating reception', error.message);
      setSnackbarMessage('Error updating reception');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error loading reception data</div>;

  return (
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <UpdateOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Reception
        </Typography>
        <p>Reception ID: {id}</p>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                name="OFnumber"
                required
                fullWidth
                id="OFnumber"
                label="OF Number"
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
                value={formData.Country}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
  );
};

export default UpdateReceptions;
