import React, { useState, useEffect } from 'react';
import { Button, TextField, InputAdornment, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { getHomeTypes } from '../api';

const CreateListing = ({ token }) => {

    const [address, setAddress] = useState('');
    const [typeId, setTypeId] = useState(1);
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [size, setSize] = useState('');
    const [parking, setParking] = useState(1);
    const [pets, setPets] = useState(false);
    const [types, setTypes] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            <form onSubmit={handleSubmit}>
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