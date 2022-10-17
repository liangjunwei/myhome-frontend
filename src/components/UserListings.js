import React, { useEffect, useState } from 'react';
import { getListingsByUser, deleteImagesByListingId, deleteListingById } from '../api';
import {  Box, styled, Paper, Grid, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const UserListings = ({ token }) => {

    let navigate = useNavigate();
    
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

    const handleEditButton = (id) => {
        navigate(`/mylistings/update/${id}`);
    }

    const handleDeleteButton = async (id) => {
        let deleted = false;

        await Swal.fire({
            icon: 'warning',
            title: 'Do you want to delete this listing?',
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: `Delete`,
        }).then((result) => {
            if(result.isDenied) {
                deleted = true;
                Swal.fire({
                    icon: 'success',
                    title: `Success`,
                    text: `Listing Deleted!`,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });

        if(deleted) {
            await deleteImagesByListingId(token, id);
            await deleteListingById(token, id);
            getMyListings();
        }
    }

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
                            <Item style={{height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} 
                                  className='listing'>
                                <div>
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
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    {approved ? <p style={{color: 'green'}}>Approved</p> : <p style={{color: 'red'}}>Not Approved Yet</p>}
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="edit" onClick={() => handleEditButton(id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => handleDeleteButton(id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </div>
                            </Item>
                        </Grid>
                    )
                })}
            </Grid>
            : <h2 className='small-title'>No Listing Yet.</h2>}
        </Box>
    );
}

export default UserListings;