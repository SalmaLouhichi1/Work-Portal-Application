import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateUserMutation, useGetUserQuery } from 'state/api';
import {  Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from "@mui/material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetUserQuery(id);
  const [updateUserMutation] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ContractorName:"",
    city: "",
    state: "",
    country: "",
    occupation: "",
    phoneNumber: "",
    transactions: "",
    role: ""
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        ContractorName: user.ContractorName || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        occupation: user.occupation || '',
        phoneNumber: user.phoneNumber || '',
        transactions: user.transactions || '',
        role: user.role || ''
      });
    }
  }, [user]);

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
      await updateUserMutation({ id, updatedData: formData });
      console.log('User updated successfully');
      setSnackbarMessage('User updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate(`/dashboard?message=${encodeURIComponent('User updated successfully')}`);
    } catch (error) {
      console.error('Error updating user', error.message);
      setSnackbarMessage('Error updating user');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error loading user data</div>;



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
            <h1>Update User information</h1>
            </Typography>
            <p>User ID: {id}</p>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    autoFocus
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
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
                    value={formData.ContractorName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="state"
                    label="State"
                    name="state"
                    autoComplete="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    autoComplete="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="occupation"
                    label="Occupation"
                    name="occupation"
                    autoComplete="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    label="phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    value={formData.phoneNumber}
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
                    value={formData.transactions}
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

export default UpdateUser;