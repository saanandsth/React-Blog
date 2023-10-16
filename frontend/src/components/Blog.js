import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Divider } from '@mui/material';

const Blog = ({ title, desc, image, user }) => {
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
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
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
