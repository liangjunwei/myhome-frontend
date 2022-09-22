import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const Nav = ({ tabValue }) => {
    
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={tabValue}
                textColor='primary'
                indicatorColor='primary'
                aria-label='nav-bar'
            >
                <Tab value='home' label='Home' component={Link} to={'/'}/>
                <Tab value='listings' label='Listings' component={Link} to={'/listings'}/>
                <Tab value='login' label='Sign In' component={Link} to={'/login'}/>
            </Tabs>
        </Box>
    );
}

export default Nav;