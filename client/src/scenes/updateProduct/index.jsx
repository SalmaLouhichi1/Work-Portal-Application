import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateProductMutation, useGetProductByIdQuery, useGetProductStatQuery, useUpdateProductStatMutation } from 'state/api';
import { Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading: isProductLoading, isError: isProductError } = useGetProductByIdQuery(id);
 
  
  const [updateProductMutation] = useUpdateProductMutation();
  
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

  //const productId = product?._id; // Define productId from product._id
  const { data: productStat, isLoading: isStatLoading, isError: isStatError } = useGetProductStatQuery(id);
  const [updateProductStatMutation] = useUpdateProductStatMutation(id);

  useEffect(() => {
    if (product) {
      setFormData((prevData) => ({
        ...prevData,
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        rating: product.rating || '',
        supply: product.supply || '',
      }));
    }
  }, [product]);

  useEffect(() => {
    if (productStat) {
      setFormData((prevData) => ({
        ...prevData,
        yearlySalesTotal: productStat.yearlySalesTotal || '',
        yearlyTotalSoldUnits: productStat.yearlyTotalSoldUnits || '',
      }));
    }
  }, [productStat]);

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
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProductMutation({ id, updatedData: formData });
      console.log('Product updated successfully');

      if (productStat) {
        await updateProductStatMutation({ id, updatedData: formData });
        console.log('ProductStat updated successfully');
      }

      setSnackbarMessage('Product and stats updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate(`/products?message=${encodeURIComponent('Product updated successfully')}`);
    } catch (error) {
      console.error('Error updating product or stats', error.message);
      setSnackbarMessage('Error updating product or stats');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isProductLoading || isStatLoading) return <CircularProgress />;
  if (isProductError) return <div>Error loading product data</div>;
  if (isStatError) return <div>Error loading product statistics</div>;

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
          Update Product
        </Typography>
        <p>Product ID: {id}</p>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
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
            <Grid item xs={12}>
              <TextField
                name="price"
                required
                fullWidth
                id="price"
                label="Price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="category"
                required
                fullWidth
                id="category"
                label="Category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="rating"
                required
                fullWidth
                id="rating"
                label="Rating"
                value={formData.rating}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="supply"
                required
                fullWidth
                id="supply"
                label="Supply"
                value={formData.supply}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="yearlySalesTotal"
                required
                fullWidth
                id="yearlySalesTotal"
                label="Yearly Sales Total"
                value={formData.yearlySalesTotal}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="yearlyTotalSoldUnits"
                required
                fullWidth
                id="yearlyTotalSoldUnits"
                label="Yearly Total Sold Units"
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

export default UpdateProduct;