import React, { useEffect } from 'react';
import { Container } from '@mui/material';

const Home = ({ setTabValue }) => {
    
    useEffect(() => {
        setTabValue('home');
        sessionStorage.setItem('tabValue', JSON.stringify('home'));
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="md" id='home-page' sx={{minHeight: '100vh'}}>
            
        </Container>
    );
}

export default Home;