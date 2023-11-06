import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, InputLabel, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };

const BlogDetail = () => {
  const naviage = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log('id', id);

  const validationSchema = yup.object({
    title: yup.string('Enter the title'),
    description: yup.string('Enter the description'),
    imageUrl: yup.string('Upload image here'),
  });

  const fetchDetails = async () => {
    const res = await axios
      .get(`https://backend-81y3.onrender.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequest = async () => {
    const res = await axios
      .put(`https://backend-81y3.onrender.com/api/blog/update/${id}`, {
        title: formik.values.title,
        description: formik.values.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => setBlog(data.blog));
  }, [id]);

  console.log(blog);

  const formik = useFormik({
    initialValues: {
      title: blog?.title,
      description: blog?.description,
      imageUrl: blog?.image,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      sendRequest()
        .then((data) => console.log(data))
        .then(() => naviage('/myBlogs/'));
      // formik.resetForm();
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
            disabled
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

export default BlogDetail;
