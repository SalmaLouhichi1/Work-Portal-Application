import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import useUserDetails from 'hooks/useUserDetails.js';

const Profile = () => {
  const { user, isLoading, isError } = useUserDetails();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching user data</div>;

  return (
    <Box sx={{ backgroundColor: 'transparent', margin: 'auto', maxWidth: 600, padding: 2 }}>
      <Paper sx={{ backgroundColor: 'transparent', padding: 4 }}>
        {user && (
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem' }}>
              User Details
            </Typography>
            <Box>
              <Typography variant="body1" component="div" sx={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                <strong>Full Name:</strong> {user.name}
              </Typography>
              <Typography variant="body1" component="div" sx={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" component="div" sx={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                <strong>City:</strong> {user.city}
              </Typography>
              <Typography variant="body1" component="div" sx={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                <strong>State:</strong> {user.state}
              </Typography>
              <Typography variant="body1" component="div" sx={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                <strong>Country:</strong> {user.country}
              </Typography>
              <Typography variant="body1" component="div" sx={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                <strong>Occupation:</strong> {user.occupation}
              </Typography>
              <Typography variant="body1" component="div" sx={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                <strong>Phone Number:</strong> {user.phoneNumber}
              </Typography>
              <Typography variant="body1" component="div" sx={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                <strong>Transactions:</strong> {user.transactions}
              </Typography>
              <Typography variant="body1" component="div" sx={{ fontSize: '1.6rem' }}>
                <strong>Role:</strong> {user.role}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
