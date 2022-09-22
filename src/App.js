import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Layout,
  Home,
  Listings,
  Login
} from './components';

const App = () => {
  const [tabValue, setTabValue] = useState('home');
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout tabValue={tabValue} />}>

        <Route index element={<Home setTabValue={setTabValue} />} />

        <Route path='/listings' element={<Listings setTabValue={setTabValue} />} />
        <Route path='/login' element={<Login setTabValue={setTabValue} />} />

        <Route path="*" element={<Navigate to="/" replace={true} />} />

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
