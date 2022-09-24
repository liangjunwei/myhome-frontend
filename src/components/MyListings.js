import React, { useEffect } from 'react';

const MyListings = ({ setTabValue }) => {
    
    useEffect(() => {
        setTabValue('mylistings');
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            My Listings
        </div>
    );
}

export default MyListings;