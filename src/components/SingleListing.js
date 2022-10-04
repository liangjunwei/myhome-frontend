import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAllImageUrls } from '../api';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Container, Box } from '@mui/material';

const SingleListing = ({ token, setTabValue }) => {
    
    const { listingId } = useParams();
    const [imageUrls, setImageUrls] = useState([]);

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

    useEffect(() => {
        setTabValue('listings');
        getImageUrls();
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="md">
            <Box>
            </Box>
            <ImageGallery items={imageUrls} showPlayButton={false} showFullscreenButton={false} />
        </Container>
    );
}

export default SingleListing;