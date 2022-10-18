import React, { useEffect, useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import CreateListing from './CreateListing';
import UserListings from './UserListings';

const MyListings = ({ setTabValue, token }) => {

    const [selectedListingIndex, setSelectedListingIndex] = useState(JSON.parse(sessionStorage.getItem('selectedListingIndex') || 0));

    const handleListItemClick = async (event, index) => {
        setSelectedListingIndex(index);
        sessionStorage.setItem('selectedListingIndex', index);
    };

    useEffect(() => {
        setTabValue('mylistings');
        sessionStorage.setItem('tabValue', JSON.stringify('mylistings'));
        // eslint-disable-next-line
    }, []);

    return (
        <Box sx={{display: 'flex', marginTop: '20px'}}>
            <Box sx={{ width: '30%', maxWidth: '300px', minHeight: '100vh', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="my listing items">
                    <ListItemButton selected={selectedListingIndex === 0} onClick={(event) => handleListItemClick(event, 0)}
                                    sx={{display: 'flex', flexWrap: 'wrap'}}
                    >
                        <ListItemIcon>
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Listings"/>
                    </ListItemButton>
                    <ListItemButton selected={selectedListingIndex === 1} onClick={(event) => handleListItemClick(event, 1)}
                                    sx={{display: 'flex', flexWrap: 'wrap'}}
                    >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Post"/>
                    </ListItemButton>
                </List>
            </Box>
            <Divider orientation="vertical" flexItem/>
            <Box sx={{ width: '70%', minHeight: '100vh', flexGrow: '1', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {selectedListingIndex === 1 ?
                    <CreateListing token={token} setSelectedListingIndex={setSelectedListingIndex}/> : <UserListings token={token}/>
                }
            </Box>
            
        </Box>
    );
}

export default MyListings;