import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './Blog';
import { Stack } from '@mui/system';

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data?.blogs));
  }, []);

  const sendRequest = async () => {
    const res = await axios
      .get('http://localhost:5000/api/blog')
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log('data', data);
    return data;
  };

  return (
    <div>
      <Stack direction='row' spacing={2} sx={{ margin: '20px' }}>
        {blogs &&
          blogs?.map((blog, index) => (
            <Blog
              isUser={localStorage.getItem('userId') === blog?.user._id}
              title={blog?.title}
              desc={blog?.description}
              image={blog?.image}
              key={blog?._id}
              user={blog?.user.name}
            />
          ))}
      </Stack>
    </div>
  );
};

export default Blogs;
