import React from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Nav = ({ tabValue, token, setToken, isAdmin, setIsAdmin }) => {

    let navigate = useNavigate();
    
    const handleLogout = () => {
        window.localStorage.clear();
        setToken(null);
        setIsAdmin(null);
        navigate("/listings", { replace: true });
    }

    return (
        <Box id='nav-bar' sx={{ width: '100%' }}>
            <Tabs
                value={tabValue}
                textColor='primary'
                indicatorColor='primary'
                aria-label='nav-bar'

            >
                <Tab value='home' label='Home' component={Link} to={'/'}/>
                <Tab value='listings' label='Listings' component={Link} to={'/listings'}/>
                {token ? null : <Tab value='login' label='Sign In' component={Link} to={'/login'}/>}
            </Tabs>
            {token ?
                <Button sx={{marginRight: '20px'}} variant='outlined' endIcon={<LogoutIcon/>} onClick={handleLogout}>
                    Log Out
                </Button>
            : null}
        </Box>
    );
}

export default Nav;