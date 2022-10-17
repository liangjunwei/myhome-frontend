import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ tabValue, setTabValue, token, setToken, isAdmin, setIsAdmin }) => {
    return (
        <>
            <Header tabValue={tabValue} setTabValue={setTabValue} token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;