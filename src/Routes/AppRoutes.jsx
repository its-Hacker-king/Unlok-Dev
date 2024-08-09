import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Layout from '../Layout/Layout';
import Playground from '../components/Pages/Playground';
import Docs from '../components/Pages/Docs';
import Signin from '../auth/Signin'; 
import Signup from '../auth/Signup';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/pages/playground" element={<Playground />} />
          <Route path="/pages/docs" element={<Docs />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
