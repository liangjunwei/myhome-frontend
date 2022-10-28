import React, { useEffect, useState } from 'react';
import { getNotApprovedYetListings } from '../api';
import { Container, Box,  Typography, styled, Paper, Pagination, Grid, CardMedia, CardContent, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Review = ({ setTabValue, token }) => {

    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [listings, setListings] = useState([]);
    
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOnClick = (id) => {
        navigate(`/listings/${id}`);
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const getListings = async () => {
        const notApprovedListings = await getNotApprovedYetListings(token);
        setListings(notApprovedListings);
        setLoading(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getListings();
        setTabValue('review');
        sessionStorage.setItem('tabValue', JSON.stringify('review'));
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="lg" sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            {loading ? 
                <div hidden={!loading} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><CircularProgress sx={{marginTop: '100px'}}/></div>
                :
                <div>
                    {listings.length ?
                        <Box sx={{display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Grid container spacing={3} sx={{alignItems: 'stretch', marginTop: '1px'}}>
                                {listings[page - 1].map(({ address, bedrooms, bathrooms, type, price, size, approved, id, imageUrl }, index) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Item style={{height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} 
                                                className='listing' onClick={() => handleOnClick(id)}>
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
                                                {approved ? <p style={{color: 'green'}}>Approved</p> : <p style={{color: 'red'}}>Not Approved Yet</p>}
                                            </Item>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            <Pagination sx={{marginTop: '15px', marginBottom: '15px'}} 
                                        count={listings.length}
                                        page={page} color="primary" onChange={handlePageChange} 
                            />
                        </Box>
                        : <h2 className='small-title' style={{marginTop: '20px'}}>No Listing Yet.</h2>
                    }
                </div>
            }
        </Container>
    );
}

export default Review;