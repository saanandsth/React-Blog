import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // need to implement formik and yup validations using material ui

  const validationSchema = yup.object({
    name: yup.string('Enter your name').required('Name is required'),
    email: yup.string('Enter your email').required('Email is required'),
    password: yup
      .string('Enter your password')
      .min('Password should be of minimum 8 char length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('login values', JSON.stringify(values, null, 2));
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
          <Typography variant='h4'>Login</Typography>
          {isSignUp && (
            <TextField
              placeholder='Name'
              name='name'
              id='name'
              value={formik.values.password}
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
            onChange={formik.handleChang}
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
          <Button color='primary' sx={{ borderRadius: 3 }} variant='contained'>
            Submit
          </Button>
          <Button sx={{ borderRadius: 3 }} variant='contained' color='inherit'>
            Signup
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Auth;
