import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ title, desc, image, user, isUser, id }) => {
  console.log(title, isUser);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`https://backend-81y3.onrender.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then((data) => console.log(data))
      .then(() => navigate('/'))
      .then(() => navigate('/blogs'));
  };
  return (
    <>
      <Card
        sx={{
          width: '20%',
          margin: '10px',
          marginTop: 2,
          padding: 2,
          boxShadow: '5px 5px 10px #ccc',
          ':hover': {
            boxShadow: '10px 10px 20px #ccc',
          },
        }}>
        {isUser && (
          <Box display='flex'>
            <IconButton sx={{ marginLeft: 'auto' }} onClick={handleEdit}>
              <ModeEditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red }} aria-label='recipe'>
              {user ? user.charAt(0) : ''}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component='img' height='194' image={image} alt='img' />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            <b> {user}</b>
            <Divider orientation='vertical' />
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Blog;
