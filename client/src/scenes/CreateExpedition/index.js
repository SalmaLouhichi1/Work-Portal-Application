//import { ThemeProvider } from "@emotion/react";
import {  Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const CreateExpedition = () => {

  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    State: "",
    DispatchDate: "",
    ShippingNumber: "",
    UpdatedDate: "",
    TransportDate: "",
    Destination: "",
    NumberOfItemsSent:"",
    Comment: "",
  });

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
      const response = await fetch("http://localhost:5001/expedition/createExpedition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const result = await response.json();
      if (response.status === 201) { // Check if the response status is 201 (created)
        navigate("/expedition");
      console.log("Expedition creation success");
      } else {
        console.error("Expedition creation Failed:", result.message); // Log the error message from the server
      }
    } catch(error){
      console.error("Error during creation:", error.message);
    }
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
              Create an Expedition
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-state"
                    name="State"
                    required
                    fullWidth
                    id="State"
                    label="State"
                    autoFocus
                    value={FormData.State}
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
                    value={FormData.DispatchDate}
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
                    value={FormData.ShippingNumber}
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
                    value={FormData.UpdatedDate}
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
                    value={FormData.TransportDate}
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
                    value={FormData.Destination}
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
                    value={FormData.NumberOfItemsSent}
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
        </Container>
      
    </>
  )
};

export default CreateExpedition;
