import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Layout,
  Home,
  Listings,
  SingleListing,
  Login,
  Register,
  MyListings,
  Review,
  Messages
} from './components';

const App = () => {
  const [tabValue, setTabValue] = useState(JSON.parse(sessionStorage.getItem('tabValue')) || 'home');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem('isAdmin')));
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout tabValue={tabValue} setTabValue={setTabValue} token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}>

        <Route index element={<Home setTabValue={setTabValue} />} />

        <Route path='/listings' element={<Listings setTabValue={setTabValue} />} />
        <Route path='/listings/:listingId' element={<SingleListing token={token} isAdmin={isAdmin} />} />
        {token ? null : <Route path='/login' element={<Login setTabValue={setTabValue} setToken={setToken} setIsAdmin={setIsAdmin} />} />}
        {token ? null : <Route path='/register' element={<Register setTabValue={setTabValue} setToken={setToken} setIsAdmin={setIsAdmin} />} />}
        {(token && !isAdmin) ? <Route path='/mylistings' element={<MyListings setTabValue={setTabValue} token={token} />} /> : null}
        {(token && isAdmin) ? <Route path='/review' element={<Review setTabValue={setTabValue} token={token} />} /> : null}
        {token ? <Route path='/messages' element={<Messages setTabValue={setTabValue} token={token}/>} /> : null}

        <Route path="*" element={<Navigate to="/" replace={true} />} />

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
