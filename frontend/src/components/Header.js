import React from 'react';
import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <>
      <AppBar sx={{ background: 'green' }}>
        <Toolbar>
          <Typography variant='h4'>Blogs App</Typography>
          <Box>
            <Button color='warning'>Login</Button>
            <Button color='warning'>Sign Up</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
