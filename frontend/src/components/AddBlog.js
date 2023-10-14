import React from 'react';
import { Typography, Box, InputLabel, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };

const AddBlog = () => {
  const validationSchema = yup.object({
    title: yup.string('Enter the title'),
    description: yup.string('Enter the description'),
    imageUrl: yup.string('Upload image here'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      imageUrl: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
          width={'50%'}>
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
            placeholder='title'
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
            margin='normal'
            variant='outlined'
            placeholder='desc'
            name='desc'
            id='desc'
            value={formik.values.desc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.desc && Boolean(formik.errors.desc)}
            helperText={formik.touched.desc && formik.errors.desc}
          />
          <InputLabel sx={labelStyles}>Image URL</InputLabel>
          <TextField
            margin='normal'
            variant='outlined'
            placeholder='image'
            name='image'
            id='image'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          />
        </Box>
      </form>
    </>
  );
};

export default AddBlog;
