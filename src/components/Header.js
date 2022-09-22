import React from 'react';
import Nav from './Nav';

const Header = ({ tabValue }) => {
    return (
        <div id='header'>
            <h1 id='title' style={{textAlign: 'center'}}>My Home</h1>
            <Nav tabValue={tabValue} />
        </div>
    );
}

export default Header;