//import { ThemeProvider } from "@emotion/react";
import {  Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, Snackbar, Alert } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const CreateReception = () => {

  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    OFnumber: "",
    RequestDate: "",
    ExpectedDeliveryDate: "",
    RemainingQuantityToBeReceived: "",
    QuantityShipped: "",
    QuantityStillToBeDelivered: "",
    Article:"",
    Maker: "",
    Country: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...FormData,
      [name]: value
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault(); // Prevent default form submission
    try{
      const response = await fetch("http://localhost:5001/receptions/createReception", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const result = await response.json();
      if (response.status === 201) { 
        setSnackbarMessage('Reception Created successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate(`/receptions?message=${encodeURIComponent('Reception created successfully')}`);
      console.log("Reception creation success");
      } else {
        console.error("Reception creation Failed:", result.message); 
        setSnackbarMessage('Error creating Reception');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch(error){
      console.error("Error during creation:", error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return(
    <>
      
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
              <CreateOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create a Reception
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-OFnumber"
                    name="OFnumber"
                    required
                    fullWidth
                    id="OFnumber"
                    label="OF number"
                    autoFocus
                    value={FormData.OFnumber}
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
                    value={FormData.RequestDate}
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
                    value={FormData.ExpectedDeliveryDate}
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
                    value={FormData.RemainingQuantityToBeReceived}
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
                    value={FormData.QuantityShipped}
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
                    value={FormData.QuantityStillToBeDelivered}
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
                    value={FormData.Article}
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
                    value={FormData.Maker}
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
                    value={FormData.Country}
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
                Create
              </Button>
            </Box>
          </Box>
          <Snackbar open={snackbarOpen} autoHideDuration={10000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
           </Alert>
         </Snackbar>
        </Container>
      
    </>
  )
};

export default CreateReception;
