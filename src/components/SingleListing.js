import React, { useEffect, useState } from 'react';
import { getAllImages, getListingById, sendMessage, disapproveListingById, approveListingById } from '../api';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Container, Box, Button, TextField, Switch, FormControlLabel } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const SingleListing = ({ token, isAdmin }) => {

    let navigate = useNavigate();
    
    const { listingId } = useParams();
    const [imageUrls, setImageUrls] = useState([]);
    const [listing, setListing] = useState({});
    const [message, setMessage] = useState('');
    const [checked, setChecked] = useState(false);

    const getImageUrls = async () => {
        const allImages = await getAllImages(listingId);
        const constructedUrls = [];
        
        for(let i = 0; i < allImages.length; i++) {
            constructedUrls.push(
                {
                    original: allImages[i].url,
                    thumbnail: allImages[i].url
                }
            );
        }
        setImageUrls(constructedUrls);
    }

    const getListing = async () => {
        const listingById = await getListingById(listingId);
        setChecked(listingById.approved);
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

    const handleApproveListing = async (event) => {
        setChecked(event.target.checked);
        if(event.target.checked) {
            await approveListingById(token, listing.id);
        }
        else {
            await disapproveListingById(token, listing.id);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getImageUrls();
        getListing();
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="md" sx={{minHeight: '100vh'}}>
            {(isAdmin || listing.approved) ?
                <div>
                    {(isAdmin && listing) ? 
                    <div style={{display: 'flex', flexDirection: 'row-reverse', marginTop: '20px'}}>
                        <FormControlLabel
                            value="start"
                            control={<Switch checked={checked} onChange={handleApproveListing}color="primary" />}
                            label="Approved"
                            labelPlacement="start"
                        />
                    </div>
                    : null}
                    <Box sx={{marginTop: '20px', marginBottom: '20px'}}>
                        <h2 className='small-title'>{listing.address}</h2>
                        <h3 className='listing-info'>Type: {listing.type}</h3>
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
                        <h3 className='small-title'>Interested in this post? Send a message to owner!</h3>
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
                </div>
                : 
                <h2 className='small-title' style={{marginTop: '20px'}}>Unauthorized Error</h2>
            }
        </Container>
    );
}

export default SingleListing;