import { Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, Snackbar, Alert } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProducts = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    supply: '',
    yearlySalesTotal: '',
    yearlyTotalSoldUnits: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Create the Product and ProductStat
      const response = await fetch("http://localhost:5001/products/createProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 201) {
        // Product and ProductStat created successfully
        setSnackbarMessage('Product and ProductStat created successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate(`/products?message=${encodeURIComponent('Product and ProductStat created successfully')}`);
        console.log("Product and ProductStat creation success", result);
      } else {
        console.error("Creation failed:", result.message);
        setSnackbarMessage('Error creating Product and ProductStat');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error during creation:", error.message);
      setSnackbarMessage('Internal server error');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
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
          <Avatar key="avatar" sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CreateOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a new Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  autoComplete="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="rating"
                  label="Rating"
                  name="rating"
                  autoComplete="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="supply"
                  label="Supply"
                  name="supply"
                  autoComplete="supply"
                  value={formData.supply}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="yearlySalesTotal"
                  label="Yearly Sales Total"
                  name="yearlySalesTotal"
                  autoComplete="yearly-sales-total"
                  value={formData.yearlySalesTotal}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="yearlyTotalSoldUnits"
                  label="Yearly Total Sold Units"
                  name="yearlyTotalSoldUnits"
                  autoComplete="yearly-total-sold-units"
                  value={formData.yearlyTotalSoldUnits}
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
  );
};

export default CreateProducts;
