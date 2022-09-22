import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Divider } from '@mui/material';

const Layout = ({ tabValue }) => {
    return (
        <>
            <Header tabValue={tabValue} />
            <Outlet />
            <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>
            <Footer />
        </>
    );
}

export default Layout;