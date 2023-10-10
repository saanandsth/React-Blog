import React from 'react';
import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <>
      <AppBar
        position='sticky'
        sx={{
          background:
            'linear-gradient(90deg, rgba(238,41,53,1) 20%, rgba(6,65,78,1) 76%)',
        }}>
        <Toolbar>
          <Typography variant='h4'>Blogs App</Typography>
          <Box display='flex' marginLeft='auto'>
            <Button
              color='warning'
              variant='info'
              sx={{ margin: 1, borderRadius: 10 }}>
              Login
            </Button>
            <Button
              color='warning'
              variant='info'
              sx={{ margin: 1, borderRadius: 10 }}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
