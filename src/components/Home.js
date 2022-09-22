import React, { useEffect } from 'react';

const Home = ({ setTabValue }) => {
    
    useEffect(() => {
        setTabValue('home');
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            Home
        </div>
    );
}

export default Home;