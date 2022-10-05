import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAllImageUrls, getListingById, sendMessage } from '../api';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Container, Box, Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const SingleListing = ({ token, setTabValue }) => {

    let navigate = useNavigate();
    
    const { listingId } = useParams();
    const [imageUrls, setImageUrls] = useState([]);
    const [listing, setListing] = useState({});
    const [message, setMessage] = useState('');

    const getImageUrls = async () => {
        const allImageUrls = await getAllImageUrls(listingId);
        const constructedUrls = [];
        
        for(let i = 0; i < allImageUrls.length; i++) {
            constructedUrls.push(
                {
                    original: allImageUrls[i],
                    thumbnail: allImageUrls[i]
                }
            );
        }
        setImageUrls(constructedUrls);
    }

    const getListing = async () => {
        const listingById = await getListingById(listingId);
        setListing(listingById);
    }

    const handleSendMessage = async (event) => {
        event.preventDefault();

        if(token) {
            const newMessage = await sendMessage(token, listingId, listing.userId, message);

            if(newMessage.error) {
                Swal.fire({
                    icon: 'error',
                    title: `${newMessage.error}`,
                    text: `${newMessage.message}`,
                    showCloseButton: true
                });
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: `Success`,
                    text: `Message sent!`,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            setMessage('');
        }
        else {
            Swal.fire({
                icon: 'error',
                title: `Message can't be sent`,
                text: `Please login to perform this action!`,
                showCloseButton: true
            });
            navigate(`/login`);
        }
    }

    useEffect(() => {
        setTabValue('listings');
        getImageUrls();
        getListing();
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="md">
            <Box sx={{marginTop: '20px', marginBottom: '20px'}}>
                <h2 className='listing-info'>{listing.address}</h2>
                <h3 className='listing-info'>Bedroom(s): {listing.bedrooms}</h3>
                <h3 className='listing-info'>Bathroom(s): {listing.bathrooms}</h3>
                <h3 className='listing-info'>${listing.price}/month</h3>
                <h3 className='listing-info'>{listing.size} sqft</h3>
                <h3 className='listing-info'>Parking Space: {listing.parking}</h3>
                {listing.pets ? <h3 className='listing-info'>Pets Allowed</h3> : <h3 className='listing-info'>Pets Not Allowed</h3>}
                <h3 className='listing-info'>Post by {listing.username}</h3>
            </Box>
            <ImageGallery items={imageUrls} showPlayButton={false} showFullscreenButton={false} />
            <Box sx={{marginTop: '20px', marginBottom: '20px'}}>
                <h3>Interested in this post? Send a message to owner!</h3>
                <form onSubmit={handleSendMessage}  style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <TextField fullWidth id='send-message' label='Message' variant='outlined' value={message}
                    margin="normal" required onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button fullWidth id='reply-button' variant='contained' type='submit' size="large"
                            sx={{marginTop: '10px', marginBottom: '20px'}}
                    >
                        Send
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default SingleListing;