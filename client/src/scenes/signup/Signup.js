import { ThemeProvider } from "@emotion/react";
import { createTheme, Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, Link, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
const Signup = () => {

  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    country: "",
    occupation:"",
    phoneNumber: "",
    transactions: "",
    role: "admin" // Set the default value to "admin"
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...FormData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch("http://localhost:5001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const result = await response.json();
      if (response.ok) {
        // Check if response status is OK
        console.log(result); // Log the result to see its structure
        if (result.message === "User created successfully") {
          // Redirect to login page upon successful signup
          navigate("/");
        } else {
          console.error("Sign Up Failed:", result.message);
        }
      } else {
        // Handle non-OK response status
        console.error("Sign Up Failed:", result.message);
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Fetch Error:", error.message);
    }
  };
  
  

  const handleSignInClick = () => {
    navigate("/");
  }

  return(
    <>
      <ThemeProvider theme={defaultTheme}>
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
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
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
                <Grid item xs={12}>
                  <Select
                    required
                    fullWidth
                    id="role"
                    label="Role"
                    name="role"
                    value={FormData.role}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="superadmin">Super Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={FormData.password}
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link variant="body2" onClick={handleSignInClick}>
                    Already Have An Account? SIGN IN 
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Signup;
