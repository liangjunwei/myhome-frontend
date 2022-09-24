import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Divider } from '@mui/material';

const Layout = ({ tabValue, setTabValue, token, setToken, isAdmin, setIsAdmin }) => {
    return (
        <>
            <Header tabValue={tabValue} setTabValue={setTabValue} token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
            <Outlet />
            <Divider sx={{marginTop: '10px', marginBottom: '10px'}} />
            <Footer />
        </>
    );
}

export default Layout;