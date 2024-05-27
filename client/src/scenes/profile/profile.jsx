import React, { useEffect, useState } from 'react';
import { Avatar, Box, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import useUserDetails from 'hooks/useUserDetails.js';

const Profile = () => {
  const { user, isLoading, isError } = useUserDetails();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ContractorName: "",
    city: "",
    state: "",
    country: "",
    occupation: "",
    phoneNumber: "",
    transactions: "",
    role: ""
  });

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching user data</div>;

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
          <Avatar key="avatar" sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            <h1>Your Profile</h1>
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
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
                  label="Email"
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
                  label="Phone Number"
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
                  label="Transactions"
                  name="transactions"
                  autoComplete="transactions"
                  value={formData.transactions}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="role"
                  label="role"
                  name="role"
                  autoComplete="role"
                  value={formData.role}
                  onChange={handleInputChange}
                />
              </Grid>
              
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Profile;
