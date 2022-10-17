import React, { useEffect, useState } from 'react';
import { listingOwnerCheck, getListingById, getHomeTypes, updateListing, disapproveListingById,
         getAllImages, setCoverImageById, deleteImageById, uploadImages } from '../api';
import { useParams } from "react-router-dom";
import { Container, Button, TextField, InputAdornment, MenuItem, FormControlLabel, 
         Checkbox, Box, ImageList, ImageListItem } from '@mui/material';
import Swal from 'sweetalert2';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import ImageUploading from 'react-images-uploading';

const UpdateListing = ({ token }) => {
    
    const { listingId } = useParams();
    const [owner, setOwner] = useState(false);
    const [address, setAddress] = useState('');
    const [typeId, setTypeId] = useState(1);
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [size, setSize] = useState('');
    const [parking, setParking] = useState(1);
    const [pets, setPets] = useState(false);
    const [types, setTypes] = useState([]);
    const [images, setImages] = useState([]);

    const [newImages, setNewImages] = useState([]);
    const maxNumber = 10;

    const checkOwner = async () => {
        const isOwner = await listingOwnerCheck(token, listingId);
        setOwner(isOwner);
    }

    const getListing = async () => {
        const listing = await getListingById(listingId);
        setAddress(listing.address);
        setTypeId(listing.typeId);
        setPrice(listing.price);
        setBedrooms(listing.bedrooms);
        setBathrooms(listing.bathrooms);
        setSize(listing.size);
        setParking(listing.parking);
        setPets(listing.pets);
    }

    const getImages = async () => {
        const allImages = await getAllImages(listingId);
        setImages(allImages);
    }

    const getTypes = async () => {
        const homeTypes = await getHomeTypes();
        setTypes(homeTypes);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedListing = await updateListing(token, address, typeId, price, bedrooms, bathrooms, size, parking, pets, listingId);
        if(updatedListing.error) {
            Swal.fire({
                icon: 'error',
                title: `${updatedListing.error}`,
                text: `${updatedListing.message}`,
                showCloseButton: true
            });
        }
        else {
            Swal.fire({
                icon: 'success',
                title: `Success`,
                text: `Listing Updated!`,
                showConfirmButton: false,
                timer: 2000
            });
            await disapproveListingById(token, listingId);
            getListing();
        }
    }

    const handleSetCover = async (id) => {
        await setCoverImageById(token, id, images[0].id);
        getImages();
        Swal.fire({
            icon: 'success',
            title: `Success`,
            text: `Cover set!`,
            showConfirmButton: false,
            timer: 2000
        });
    }

    const handleDeleteImage = async (id) => {
        await deleteImageById(token, id);
        getImages();
        Swal.fire({
            icon: 'success',
            title: `Success`,
            text: `Image Deleted!`,
            showConfirmButton: false,
            timer: 2000
        });
    }

    const handleImagesOnChange = (imageList, addUpdateIndex) => {
        setNewImages(imageList);
    };

    const handleUploadImages = async () => {

        if(newImages.length) {
            const formData = new FormData();

            for(let i = 0; i < newImages.length; i++) {
                formData.append("images", newImages[i].file);
            }

            formData.append("listingId", listingId);

            await uploadImages(formData);

            setNewImages([]);
            getImages();

            Swal.fire({
                icon: 'success',
                title: `Success`,
                text: `Images Uploaded!`,
                showConfirmButton: false,
                timer: 2000
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: `Missing Image Error`,
                text: `You need to upload at least one image!`,
                showCloseButton: true
            });
        }
    }

    useEffect(() => {
        checkOwner();
        getListing();
        getImages();
        getTypes();
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="sm" sx={{minHeight: '100vh'}}>
            {owner ? 
                <Box sx={{marginTop: '20px'}}>
                    <h2 className='small-title'>Edit Listing Information Below:</h2>
                    <p style={{textAlign: 'center', color: 'red'}}>Note: Admin will review and approve your listing within 24 hours. Please be patient.</p>
                    <form onSubmit={handleSubmit} style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <TextField fullWidth id='edit-address' label='Address' variant='outlined' value={address}
                                    margin="normal" required onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField fullWidth id='edit-price' label='Price/Month' variant='outlined' value={price}
                                    margin="normal" required onChange={(e) => setPrice(e.target.value)}
                                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        />
                        <TextField fullWidth id='edit-size' label='Size' variant='outlined' value={size}
                                    margin="normal" required onChange={(e) => setSize(e.target.value)}
                                    InputProps={{startAdornment: <InputAdornment position="start">Sqft</InputAdornment>}}
                        />
                        {types.length ? 
                            <TextField fullWidth id="edit-home-type" select label="Home Type" value={typeId}
                                    margin="normal" onChange={(e) => setTypeId(e.target.value)}
                            >
                                {types.map((type, index) => (
                                    <MenuItem key={index} value={type.id}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            : null
                        }
                        <TextField fullWidth id="edit-number-bedrooms" select label="Bedrooms" value={bedrooms}
                                margin="normal" onChange={(e) => setBedrooms(e.target.value)}
                        >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                        </TextField>
                        <TextField fullWidth id="edit-number-bathrooms" select label="Bathrooms" value={bathrooms}
                                margin="normal" onChange={(e) => setBathrooms(e.target.value)}
                        >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                        </TextField>
                        <TextField fullWidth id="edit-number-parking" select label="Parking" value={parking}
                                margin="normal" onChange={(e) => setParking(e.target.value)}
                        >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                        </TextField>

                        <FormControlLabel control={<Checkbox id="eidt-pets" onChange={(e) => setPets(e.target.checked)}/>} 
                                          label="Allow Pets?" labelPlacement="start" checked={pets}
                        />

                        <Button fullWidth id='edit-listing' variant='contained' type='submit' size="large"
                                sx={{marginTop: '10px', marginBottom: '20px'}}
                        >
                            Save Changes
                        </Button>
                    </form>

                    <h2 className='small-title' style={{marginTop: '50px'}}>Edit Images Below:</h2>
                    <ImageList sx={{ width: '100%', height: 450, borderWidth: '3px', borderStyle: 'solid' }} cols={3} rowHeight={180}>
                        {images.map((image, index) => (
                            <ImageListItem key={index} className="image-item">
                            <img
                                src={image.url}
                                alt='listingimage'
                                loading="lazy"
                                style={{maxHeight: '140px', minHeight: '140px', marginBottom: '10px'}}
                            />
                            {image.cover ? <h3 style={{textAlign: 'center'}}>Cover</h3> :
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button variant='outlined' size="small" onClick={() => handleSetCover(image.id)}>Set As Cover</Button>
                                <DeleteIcon sx={{cursor: 'pointer', marginLeft: '5px'}} onClick={() => handleDeleteImage(image.id)}/>
                            </div>
                            }
                            </ImageListItem>
                        ))}
                    </ImageList>

                    <h2 className='small-title' style={{marginTop: '50px'}}>Upload More Images:</h2>
                    <ImageUploading
                        multiple
                        value={newImages}
                        onChange={handleImagesOnChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                                <div className="upload__image-wrapper" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Box
                                        id='image-dropzone'
                                        style={isDragging ? { background: '#e6f7ff' } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        <h3>Click or Drop Here</h3>
                                        <UploadIcon fontSize='large'/>
                                    </Box>
                                    &nbsp;
                                    <Button sx={{width: '40%', marginBottom: '20px'}} type='button' variant="contained" color="error" onClick={onImageRemoveAll}>Remove all images</Button>
                                    <h3 className='small-title' style={{marginTop: '30px'}}>Images Preview:</h3>
                                    <ImageList sx={{ width: '100%', height: 450, borderWidth: '3px', borderStyle: 'solid' }} cols={3} rowHeight={180}>
                                        {imageList.map((image, index) => (
                                            <ImageListItem key={index} className="image-item">
                                            <img
                                                src={image['data_url']}
                                                alt=''
                                                loading="lazy"
                                                style={{maxHeight: '140px', minHeight: '140px', marginBottom: '10px'}}
                                            />
                                            <div className="image-item__btn-wrapper" style={{display: 'flex', justifyContent: 'center'}}>
                                                <ReplayIcon sx={{cursor: 'pointer'}} onClick={() => onImageUpdate(index)}/>
                                                <DeleteIcon sx={{cursor: 'pointer'}} onClick={() => onImageRemove(index)}/>
                                            </div>
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </div>
                            )}
                    </ImageUploading>
                    <Button fullWidth id='upload-images' variant='contained' onClick={handleUploadImages} size="large"
                            sx={{marginTop: '30px', marginBottom: '30px'}}
                    >
                        Upload
                    </Button>
                </Box>
            : <h2 style={{marginTop: '20px'}} className='small-title'>Unauthorized Error</h2>
            }
        </Container>
    );
}

export default UpdateListing;