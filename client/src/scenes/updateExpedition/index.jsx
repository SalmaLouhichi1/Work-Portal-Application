import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateExpeditionMutation, useGetExpeditionByIdQuery } from 'state/api';
import {  Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

const UpdateExpedition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: expedition, isLoading, isError } = useGetExpeditionByIdQuery(id);
  const [updateExpeditionMutation] = useUpdateExpeditionMutation();
  const [formData, setFormData] = useState({
    State: '',
    DispatchDate: '',
    ShippingNumber: '',
    UpdatedDate: '',
    TransportDate: '',
    Destination: '',
    NumberOfItemsSent: '',
    Comment: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (expedition) {
      setFormData({
        State: expedition.State || '',
        DispatchDate: expedition.DispatchDate || '',
        ShippingNumber: expedition.ShippingNumber || '',
        UpdatedDate: expedition.UpdatedDate || '',
        TransportDate: expedition.TransportDate || '',
        Destination: expedition.Destination || '',
        NumberOfItemsSent: expedition.NumberOfItemsSent || '',
        Comment: expedition.Comment || ''
      });
    }
  }, [expedition]);

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
      await updateExpeditionMutation({ id, updatedData: formData });
      console.log('Expedition updated successfully');
      setSnackbarMessage('Expedition updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate(`/expedition?message=${encodeURIComponent('Expedition updated successfully')}`);
    } catch (error) {
      console.error('Error updating expedition', error.message);
      setSnackbarMessage('Error updating expedition');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error loading expedition data</div>;



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
            <h1>Update Expedition</h1>
            </Typography>
            <p>Expedition ID: {id}</p>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-State"
                    name="State"
                    required
                    fullWidth
                    id="State"
                    label="State"
                    autoFocus
                    value={formData.State}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="DispatchDate"
                    label="Dispatch Date"
                    name="DispatchDate"
                    autoComplete="DispatchDate"
                    value={formData.DispatchDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="ShippingNumber"
                    label="Shipping Number"
                    name="ShippingNumber"
                    autoComplete="ShippingNumber"
                    value={formData.ShippingNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="UpdatedDate"
                    label="Updated Date"
                    name="UpdatedDate"
                    autoComplete="UpdatedDate"
                    value={formData.UpdatedDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="TransportDate"
                    label="Transport Date"
                    name="TransportDate"
                    autoComplete="TransportDate"
                    value={formData.TransportDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="Destination"
                    label="Destination"
                    name="Destination"
                    autoComplete="Destination"
                    value={formData.Destination}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="NumberOfItemsSent"
                    label="Number Of Items Sent"
                    name="NumberOfItemsSent"
                    autoComplete="NumberOfItemsSent"
                    value={formData.NumberOfItemsSent}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="Comment"
                    label="Comment"
                    name="Comment"
                    autoComplete="Comment"
                    value={formData.Comment}
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

export default UpdateExpedition;