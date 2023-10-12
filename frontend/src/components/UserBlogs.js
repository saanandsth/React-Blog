import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Blog from './Blog';

const UserBlogs = () => {
  const [blogs, setBlogs] = useState();
  const id = localStorage.getItem('userId');
  const sendRequest = async () => {
    const response = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data?.blogs?.blogs));
  }, []);

  console.log('data from userBlogs', blogs);

  return (
    <>
      {blogs &&
        blogs?.map((blog, index) => {
          <Blog
            title={blog.title}
            desc={blog.description}
            image={blog.image}
            key={blog._id}
            user={blog.user.name}
          />;
        })}
    </>
  );
};

export default UserBlogs;
