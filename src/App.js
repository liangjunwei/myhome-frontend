import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Layout,
  Home,
  Listings,
  Login,
  Register,
  MyListings,
  Messages
} from './components';

const App = () => {
  const [tabValue, setTabValue] = useState('home');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout tabValue={tabValue} setTabValue={setTabValue} token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}>

        <Route index element={<Home setTabValue={setTabValue} />} />

        <Route path='/listings' element={<Listings setTabValue={setTabValue} />} />
        {token ? null : <Route path='/login' element={<Login setTabValue={setTabValue} setToken={setToken} setIsAdmin={setIsAdmin} />} />}
        {token ? null : <Route path='/register' element={<Register setTabValue={setTabValue} setToken={setToken} setIsAdmin={setIsAdmin} />} />}
        {token ? <Route path='/mylistings' element={<MyListings setTabValue={setTabValue} />} /> : null}
        {token ? <Route path='/messages' element={<Messages setTabValue={setTabValue} />} /> : null}

        <Route path="*" element={<Navigate to="/" replace={true} />} />

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
