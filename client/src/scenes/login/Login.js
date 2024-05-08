import { ThemeProvider } from "@emotion/react";
import { createTheme, Avatar, Box, Container, CssBaseline, Grid, TextField, Typography, Button, Link} from "@mui/material";
import React, { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
const Login = () => {

  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...FormData,
      [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const result = await response.json();
      if (result.user._id) { // Check if user._id exists
        navigate("/dashboard");
        const user = JSON.stringify(result.user);
        localStorage.setItem("user", user);
        localStorage.setItem("token", result.token);
      } else {
        console.error("Sign In Failed");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const handleSignUpClick = () => {
    navigate("/register");
  };

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
            <Avatar sx={{m:1, bgcolor: 'secondary.main'}}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" noValidate sx={{ mt:3}}>
                  <TextField
                  margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={FormData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="password"
                    label="password"
                    name="password"
                    autoComplete="current-password"
                    value={FormData.password}
                    onChange={handleInputChange}
                  />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb:2}}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link variant="body2" onClick={handleSignUpClick}>
                    {"Don't Have an Account? Sign UP"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
};

export default Login;
