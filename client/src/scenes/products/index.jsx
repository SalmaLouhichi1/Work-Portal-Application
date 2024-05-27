import React, {useState, useEffect} from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  IconButton, 
  Tooltip,
  Snackbar, 
  Alert,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery, useDeleteProductMutation } from "state/api";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from "react-router-dom";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Product = ({
  _id,
  name = "N/A",
  description = "No description available",
  price = 0,
  rating = 0,
  category = "Unknown",
  supply = 0,
  stat = [{}], 
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const [deleteProductMutation] = useDeleteProductMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Check for success message in URL query params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get('message');

  // Display success message if exists
  useEffect(() => {
    if (successMessage) {
      setSnackbarMessage(successMessage);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  }, [successMessage]);

  const handleDelete = async (_id) => {
    try {
      // Call the delete product with the product ID
      await deleteProductMutation(_id);
      console.log('Deleted successfully');
      setSnackbarMessage('Product deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting product:', error.message);
      setSnackbarMessage('Error deleting product');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
      
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name} 
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
        <IconButton
            aria-label="Update"
            onClick={() => navigate(`/updateProduct/${_id}`)}
          >
            <UpdateOutlinedIcon />
          </IconButton>
        <Tooltip title="Delete Product">
          <IconButton onClick={() => handleDelete(_id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
        <Snackbar open={snackbarOpen} autoHideDuration={10000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '200%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.length >0 ? stat[0].yearlySalesTotal :0}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.length >0 ? stat[0].yearlyTotalSoldUnits :0}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data = [], isLoading } = useGetProductsQuery(); // Added default value for data
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  console.log(data); // Add this line to check the data structure

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Check for success message in URL query params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get('message');

  // Display success message if exists
  useEffect(() => {
    if (successMessage) {
      setSnackbarMessage(successMessage);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  }, [successMessage]);

  const handleAdd = () => {
    navigate("/CreateProduct");
  };

  /**/

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="FINAL PRODUCTS" subtitle="See your list of products." />
      <Snackbar open={snackbarOpen} autoHideDuration={10000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '200%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Tooltip title="Add Products">
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        
      {data.length > 0 || !isLoading ? ( // Added length check for data
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
