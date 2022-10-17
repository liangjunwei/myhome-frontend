import React from 'react';
import Nav from './Nav';

const Header = ({ tabValue, setTabValue, token, setToken, isAdmin, setIsAdmin }) => {
    return (
        <div id='header'>
            <h1 id='title' style={{textAlign: 'center'}}>My Home 🏠</h1>
            <h2 id='sub-title' style={{textAlign: 'center'}}>A platform where people can post and find their homes.</h2>
            <Nav tabValue={tabValue} setTabValue={setTabValue} token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        </div>
    );
}

export default Header;