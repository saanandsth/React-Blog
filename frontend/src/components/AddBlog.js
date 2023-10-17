import React from 'react';
import { Typography, Box, InputLabel, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };

const AddBlog = () => {
  const validationSchema = yup.object({
    title: yup.string('Enter the title'),
    description: yup.string('Enter the description'),
    imageUrl: yup.string('Upload image here'),
  });

  const sendRequest = async () => {
    const response = await axios
      .post('http://localhost:5001/api/blog/add', {
        title: formik.values.title,
        description: formik.values.description,
        image: formik.values.imageUrl,
        user: localStorage.getItem('userId'),
      })
      .catch((err) => console.log(err));
    // getting the response
    const data = await response.data;
    return data;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      imageUrl: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      sendRequest().then((data) => console.log(data));
      formik.resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          // border={0.5}
          borderColor='grey'
          borderRadius={10}
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          margin={3}
          display='flex'
          flexDirection={'column'}
          justifyContent='center'
          width={'30%'}>
          <Typography
            fontWeight={'bold'}
            padding={3}
            color='grey'
            variant='h3'
            textAlign={'center'}>
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            placeholder='Please enter Title'
            name='title'
            id='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.title)}
            margin='normal'
            variant='outlined'
            helperText={formik.touched.title && formik.errors.title}
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            placeholder='Please write description'
            name='description'
            id='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            margin='normal'
            variant='outlined'
            helperText={formik.touched.description && formik.errors.description}
          />
          <InputLabel sx={labelStyles}>Image URL</InputLabel>
          <TextField
            placeholder='Please upload image here'
            name='imageUrl'
            id='imageUrl'
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
            margin='normal'
            variant='outlined'
            helperText={formik.touched.imageUrl && formik.errors.imageUrl}
          />
          <Button
            color='primary'
            sx={{ borderRadius: 4, marginTop: 2 }}
            variant='contained'
            size='medium'
            type='submit'>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddBlog;
