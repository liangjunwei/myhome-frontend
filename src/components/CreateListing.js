import React, { useState, useEffect } from 'react';
import { Button, TextField, InputAdornment, MenuItem, FormControlLabel, Checkbox, Box, ImageList, ImageListItem } from '@mui/material';
import { getHomeTypes, uploadImages, createListing } from '../api';
import ImageUploading from 'react-images-uploading';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import Swal from 'sweetalert2';

const CreateListing = ({ token, setSelectedListingIndex }) => {

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
    const maxNumber = 10;

    const handleImagesOnChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(images.length) {
            const newListing = await createListing (token, address, typeId, price, bedrooms, bathrooms, size, parking, pets);
            
            if(newListing) {
                const formData = new FormData();

                for(let i = 0; i < images.length; i++) {
                    formData.append("images", images[i].file);
                }

                formData.append("listingId", newListing.id);

                await uploadImages(formData);

                Swal.fire({
                    icon: 'success',
                    title: `Success`,
                    text: `Listing Created!`,
                    showConfirmButton: false,
                    timer: 2000
                });

                setSelectedListingIndex(0);
                sessionStorage.setItem('selectedListingIndex', 0);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: `Oops, something went wrong...`,
                    text: `Please make sure your information is correct!`,
                    showCloseButton: true
                });
            }
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

    const getTypes = async () => {
        const homeTypes = await getHomeTypes();
        setTypes(homeTypes);
    }

    useEffect(() => {
        getTypes();
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{width: '70%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 style={{textAlign: 'center'}}>New Listing Form</h2>
            <p style={{textAlign: 'center', color: 'red'}}>Note: Admin will review and approve your listing within 24 hours. Please be patient.</p>
            <form onSubmit={handleSubmit} style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <TextField fullWidth id='new-address' label='Address' variant='outlined' value={address}
                            margin="normal" required onChange={(e) => setAddress(e.target.value)}
                />
                <TextField fullWidth id='new-price' label='Price/Month' variant='outlined' value={price}
                            margin="normal" required onChange={(e) => setPrice(e.target.value)}
                            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                />
                <TextField fullWidth id='new-size' label='Size' variant='outlined' value={size}
                            margin="normal" required onChange={(e) => setSize(e.target.value)}
                            InputProps={{startAdornment: <InputAdornment position="start">Sqft</InputAdornment>}}
                />
                {types.length ? 
                    <TextField fullWidth id="new-home-type" select label="Home Type" value={typeId}
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
                <TextField fullWidth id="new-number-bedrooms" select label="Bedrooms" value={bedrooms}
                           margin="normal" onChange={(e) => setBedrooms(e.target.value)}
                >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                </TextField>
                <TextField fullWidth id="new-number-bathrooms" select label="Bathrooms" value={bathrooms}
                           margin="normal" onChange={(e) => setBathrooms(e.target.value)}
                >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                </TextField>
                <TextField fullWidth id="new-number-parking" select label="Parking" value={parking}
                           margin="normal" onChange={(e) => setParking(e.target.value)}
                >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                </TextField>

                <FormControlLabel control={<Checkbox id="new-pets" onChange={(e) => setPets(e.target.checked)}/>} 
                                  label="Allow Pets?" labelPlacement="start"
                />

                <h3 style={{marginBottom: '20px', marginTop: '20px'}}>Upload Images Below:</h3>

                <ImageUploading
                    multiple
                    value={images}
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
                                <Button sx={{width: '30%', marginBottom: '20px'}} type='button' variant="contained" color="error" onClick={onImageRemoveAll}>Remove all images</Button>
                                <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
                                    {imageList.map((image, index) => (
                                        <ImageListItem key={index} className="image-item">
                                        <img
                                            src={image['data_url']}
                                            alt=''
                                            loading="lazy"
                                            style={{height: '145px'}}
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

                <Button fullWidth id='create-listing' variant='contained' type='submit' size="large"
                        sx={{marginTop: '10px', marginBottom: '20px'}}
                >
                    Post
                </Button>
            </form>
        </div>
    );
}

export default CreateListing;