import React, { useEffect } from 'react';

const Listings = ({ setTabValue }) => {
    
    useEffect(() => {
        setTabValue('listings');
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            Listings
        </div>
    );
}

export default Listings;