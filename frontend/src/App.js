import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/auth' element={<Auth />}></Route>
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/add' element={<AddBlog />} />
          <Route path='/myBlogs' element={<UserBlogs />} />
          <Route path='/myBlogs/:id' element={<BlogDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
