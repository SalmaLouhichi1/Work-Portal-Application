import {  Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, Snackbar, Alert } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const CreateLandering = () => {

  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    Articlenumber: "",
    RequestDate: "",
    ExpectedDeliveryDate: "",
    QuantityReceived: "",
    RemainingQuantityToBeReceived: "",
    Article:"",
    Maker: "",
    QuantityToBeShipped: "",
    Comment: "",
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
      const response = await fetch("http://localhost:5001/landering/createLandering", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const result = await response.json();
      if (response.status === 201) { // Check if the response status is 201 (created)
        setSnackbarMessage('Landering Created successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate(`/landering?message=${encodeURIComponent('Landering created successfully')}`);

      console.log("Landering creation success");
      } else {
        console.error("Landering creation Failed:", result.message); 
        setSnackbarMessage('Error creating landering');
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
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create a Landering
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-Articlenumber"
                    name="Articlenumber"
                    required
                    fullWidth
                    id="Articlenumber"
                    label="Article number"
                    autoFocus
                    value={FormData.Articlenumber}
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
                    id="QuantityReceived"
                    label="Quantity Received"
                    name="QuantityReceived"
                    autoComplete="QuantityReceived"
                    value={FormData.QuantityReceived}
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
                    id="QuantityToBeShipped"
                    label="Quantity To Be Shipped"
                    name="QuantityToBeShipped"
                    autoComplete="QuantityToBeShipped"
                    value={FormData.QuantityToBeShipped}
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
                    value={FormData.Comment}
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

export default CreateLandering;
