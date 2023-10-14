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
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './../store/index';

const Header = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
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
                <Tab
                  LinkComponent={Link}
                  to='/blogs/add'
                  label='Add Blog'></Tab>
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
                onClick={() => dispatch(authActions.logout())}
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
