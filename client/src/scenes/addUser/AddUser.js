import { Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert  } from "@mui/material";
import React, { useState } from "react";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from "react-router-dom";

//const defaultTheme = createTheme();
const AddUser = () => {


  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    ContractorName: "",
    city: "",
    state: "",
    country: "",
    occupation:"",
    phoneNumber: "",
    transactions: "",
    role: "TLS Admin", 
  });

  const navigate = useNavigate();
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
      const response = await fetch("http://localhost:5001/user/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const result = await response.json();
      if (response.status === 201) { 
        setSnackbarMessage('User Created successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate(`/dashboard?message=${encodeURIComponent('user created successfully')}`);
      } else {
        console.error("Adding User Failed:", result.message);
        setSnackbarMessage('Error creating User');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch(error){
      console.error("Error during adding user:", error.message);
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
              <PersonAddAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add User
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    autoFocus
                    value={FormData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={FormData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="ContractorName"
                    label="Contractor Name"
                    name="ContractorName"
                    autoComplete="ContractorName"
                    value={FormData.ContractorName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="city"
                    name="city"
                    autoComplete="city"
                    value={FormData.city}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="state"
                    label="state"
                    name="state"
                    autoComplete="state"
                    value={FormData.state}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="country"
                    label="country"
                    name="country"
                    autoComplete="country"
                    value={FormData.country}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="occupation"
                    label="occupation"
                    name="occupation"
                    autoComplete="occupation"
                    value={FormData.occupation}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="phoneNumber"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    value={FormData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="transactions"
                    label="transactions"
                    name="transactions"
                    autoComplete="transactions"
                    value={FormData.transactions}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                    required
                    fullWidth
                    id="role"
                    name="role"
                    value={FormData.role}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="TLS admin">TLS Admin</MenuItem>
                    <MenuItem value="Sewing Contractor">Sewing Contractor</MenuItem>
                    <MenuItem value="Washing Contractor">Washing Contractor</MenuItem>
                  </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="password"
                    label="password"
                    name="password"
                    autoComplete="password"
                    value={FormData.password}
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
                Add User
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

export default AddUser;
