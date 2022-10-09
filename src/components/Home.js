import React, { useEffect } from 'react';

const Home = ({ setTabValue }) => {
    
    useEffect(() => {
        setTabValue('home');
        sessionStorage.setItem('tabValue', JSON.stringify('home'));
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            Home
        </div>
    );
}

export default Home;