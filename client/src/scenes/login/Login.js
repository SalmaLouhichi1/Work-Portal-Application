import { ThemeProvider } from "@emotion/react";
import { createTheme, Avatar, Box, Container, CssBaseline, TextField, Typography, Button} from "@mui/material";
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
      console.log("Login result:", result); // Log the result object
      if (response.ok) {
        // Check if response status is ok
        if (result.user) {
          navigate("/dashboard");
          const user = JSON.stringify(result.user);
          localStorage.setItem("user", user);
          localStorage.setItem("token", result.token);
        } else {
          console.error("Sign IN Failed");
        }        
      } else {
        // Handle non-200 response status
        console.error("Error during login:", result.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error.message);
    }
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
                    autoComplete="password"
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
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
};

export default Login;