import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './../store/index';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string('Enter your name'),
    email: yup.string('Enter your email').required('Email is required'),
    password: yup
      .string('Enter your password')
      // .min('Password should be of minimum 8 char length')
      .required('Password is required'),
  });

  const sendRequest = async (type = 'login') => {
    console.log(type);
    const response = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
      })
      .catch((err) => console.log(err));
    const data = await response.data;
    console.log('data from auth', data);
    return data;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('login values', JSON.stringify(values, null, 2));
      if (isSignUp) {
        sendRequest('signup')
          .then((data) => localStorage.setItem('userId', data.user._id))
          .then(() => dispatch(authActions.login()))
          .then(() => navigate('/blogs'))
          .then((data) => console.log(data));
      } else {
        sendRequest('login')
          .then((data) => localStorage.setItem('userId', data.user._id))
          .then(() => dispatch(authActions.login()))
          .then(() => navigate('/blogs'))
          .then((data) => console.log(data));
      }
      formik.resetForm();
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          gap={2}
          maxWidth={400}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={5}>
          <Typography variant='h4'>{isSignUp ? 'Signup' : 'Login'}</Typography>
          {isSignUp && (
            <TextField
              placeholder='Name'
              name='name'
              id='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          )}
          <TextField
            placeholder='Email'
            type={'email'}
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            placeholder='Password'
            type={'password'}
            name='password'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            color='primary'
            sx={{ borderRadius: 3 }}
            variant='contained'
            type='submit'>
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3 }}
            variant='contained'
            color='inherit'
            onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Auth;
