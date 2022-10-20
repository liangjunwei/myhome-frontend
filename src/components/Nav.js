import React from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Nav = ({ tabValue, setTabValue, token, setToken, isAdmin, setIsAdmin }) => {

    let navigate = useNavigate();
    
    const handleLogout = () => {
        sessionStorage.clear();
        setToken(null);
        setIsAdmin(null);
        setTabValue('listings');
        navigate("/listings", { replace: true });
    }

    return (
        <Box id='nav-bar' sx={{ width: '100%' }}>
            <Tabs value={tabValue} textColor='inherit' TabIndicatorProps={{style: {background:'#1f7a1f'}}} aria-label='nav-bar'
                  variant='scrollable' scrollButtons={false}
            >
                <Tab value='home' label='home' component={Link} to={'/'}/>
                <Tab value='listings' label='listings' component={Link} to={'/listings'}/>
                {token ? null : <Tab value='login' label='sign in' component={Link} to={'/login'}/>}
                {(token && !isAdmin) ? <Tab value='mylistings' label='my listings' component={Link} to={'/mylistings'}/> : null}
                {(token && isAdmin) ? <Tab value='review' label='review' component={Link} to={'/review'}/> : null}
                {token ? <Tab value='messages' label='message center' component={Link} to={'/messages'}/> : null}
            </Tabs>
            {token ?
                <Button id='log-out-button' variant='outlined' color='inherit' endIcon={<LogoutIcon/>} onClick={handleLogout}>
                    Log Out
                </Button>
            : null}
        </Box>
    );
}

export default Nav;