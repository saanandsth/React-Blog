import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
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
          {isLoggedIn && (
            <Box display='flex'>
              <Tabs
                sx={{ margin: 1 }}
                textColor='inherit'
                value={value}
                onChange={(e, val) => setValue(val)}>
                <Tab LinkComponent={Link} to='/blogs' label='All Blogs'></Tab>
                <Tab LinkComponent={Link} to='/myBlogs' label='My Blogs'></Tab>
              </Tabs>
            </Box>
          )}
          <Box display='flex' marginLeft='auto'>
            {!isLoggedIn && (
              <>
                <Button
                  LinkComponent={Link}
                  to='/auth'
                  color='warning'
                  variant='info'
                  sx={{ margin: 1, borderRadius: 10 }}>
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  to='/auth'
                  color='warning'
                  variant='info'
                  sx={{ margin: 1, borderRadius: 10 }}>
                  Sign Up
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                LinkComponent={Link}
                to='/auth'
                color='warning'
                variant='info'
                sx={{ margin: 1, borderRadius: 10 }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
