import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Blog from './Blog';
import { Stack } from '@mui/system';

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem('userId');
  const sendRequest = async () => {
    const response = await axios
      .get(`https://backend-81y3.onrender.com/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await response.data;

    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data?.user));
  }, []);

  console.log('data from userBlogs', user);

  return (
    <div>
      <Stack direction='row' spacing={2} sx={{ margin: '20px' }}>
        {user &&
          user.blogs &&
          user.blogs?.map((blog, index) => (
            <Blog
              id={blog._id}
              isUser={true}
              title={blog?.title}
              desc={blog?.description}
              image={blog?.image}
              key={index}
              user={user.name}
            />
          ))}
      </Stack>
    </div>
  );
};

export default UserBlogs;
