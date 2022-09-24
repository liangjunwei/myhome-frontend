import React, { useEffect } from 'react';

const Messages = ({ setTabValue }) => {
    
    useEffect(() => {
        setTabValue('messages');
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            Message Center
        </div>
    );
}

export default Messages;