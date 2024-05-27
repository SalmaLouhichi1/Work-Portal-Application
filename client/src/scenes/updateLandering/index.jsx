import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateLanderingMutation, useGetLanderingByIdQuery } from 'state/api';
import {  Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

const UpdateLandering = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: landering, isLoading, isError } = useGetLanderingByIdQuery(id);
  const [updateLanderingMutation] = useUpdateLanderingMutation();
  const [formData, setFormData] = useState({
    Articlenumber: '',
    RequestDate: '',
    ExpectedDeliveryDate: '',
    QuantityReceived: '',
    RemainingQuantityToBeReceived: '',
    QuantityStillToBeDelivered: '',
    Article: '',
    Maker: '',
    QuantityToBeShipped: '',
    Comment: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (landering) {
      setFormData({
        Articlenumber: landering.Articlenumber || '',
        RequestDate: landering.RequestDate || '',
        ExpectedDeliveryDate: landering.ExpectedDeliveryDate || '',
        QuantityReceived: landering.QuantityReceived || '',
        RemainingQuantityToBeReceived: landering.RemainingQuantityToBeReceived || '',
        Article: landering.Article || '',
        Maker: landering.Maker || '',
        QuantityToBeShipped: landering.QuantityToBeShipped || '',
        Comment: landering.Comment || ''
      });
    }
  }, [landering]);

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
      await updateLanderingMutation({ id, updatedData: formData });
      console.log('Landering updated successfully');
      setSnackbarMessage('Landering updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate(`/landering?message=${encodeURIComponent('Landering updated successfully')}`);
    } catch (error) {
      console.error('Error updating Landering', error.message);
      setSnackbarMessage('Error updating Landering');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error loading Landering data</div>;


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
            <h1>Update Landering</h1>
            </Typography>
            <p>Landering ID: {id}</p>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-Articlenumber"
                    name="Articlenumber"
                    required
                    fullWidth
                    id="Articlenumber"
                    label="Article Number"
                    autoFocus
                    value={formData.Articlenumber}
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
                    id="QuantityReceived"
                    label="Quantity Received"
                    name="QuantityReceived"
                    autoComplete="QuantityReceived"
                    value={formData.QuantityReceived}
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
                    id="QuantityToBeShipped"
                    label="Quantity To Be Shipped"
                    name="QuantityToBeShipped"
                    autoComplete="QuantityToBeShipped"
                    value={formData.QuantityToBeShipped}
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

export default UpdateLandering;