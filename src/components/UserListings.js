import React, { useEffect, useState } from 'react';
import { getListingsByUser } from '../api';
import {  Box, styled, Paper, Grid, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserListings = ({ token }) => {
    
    const [myListings, setMyListings] = useState([]);

    const getMyListings = async () => {
        const listings = await getListingsByUser(token);
        setMyListings(listings);
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        getMyListings();
        // eslint-disable-next-line
    }, []);

    return (
        <Box sx={{width: '90%', minHeight: '100vh'}}>
            {myListings.length ? 
            <Grid container spacing={3} sx={{alignItems: 'stretch', marginTop: '1px'}}>
                {myListings.map(({ address, bedrooms, bathrooms, type, price, size, approved, id, imageUrl }, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Item style={{height: '100%', cursor: 'pointer'}} className='listing'>
                                <CardMedia
                                    component='img'
                                    src={imageUrl}
                                    alt='listing-cover'
                                    sx={{height: '200px'}}
                                />
                                <CardContent sx={{textAlign: 'left'}}>
                                    <Typography gutterBottom sx={{color: 'black', fontFamily: 'Kanit'}}>
                                    {address}
                                    </Typography>
                                    <Typography>
                                    Bedroom(s): {bedrooms}
                                    </Typography>
                                    <Typography>
                                    Bathroom(s): {bathrooms} 
                                    </Typography>
                                    <Typography>
                                    ${price}/month
                                    </Typography>
                                    <Typography>
                                    {size} sqft
                                    </Typography>
                                    <Typography>
                                    Type: {type}
                                    </Typography>
                                </CardContent>
                                {approved ? <p style={{color: 'green'}}>Approved</p> : <p style={{color: 'red'}}>Not Approved Yet</p>}
                                <CardActions disableSpacing>
                                    <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Item>
                        </Grid>
                    )
                })}
            </Grid>
            : <h2 style={{textAlign: 'center'}}>No Listing Yet.</h2>}
        </Box>
    );
}

export default UserListings;