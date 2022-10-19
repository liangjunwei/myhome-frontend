import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, FormGroup, FormLabel, FormControlLabel, 
         Checkbox, Accordion, AccordionSummary, Typography,
         AccordionDetails, styled, Paper, Pagination,
         Grid, CardMedia, CardContent, Button } from '@mui/material';
import { getHomeTypes, getApprovedListings } from '../api';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

const Listings = ({ setTabValue }) => {

    let navigate = useNavigate();

    // search string and filter arrays
    const [keyword, setKeyword] = useState(JSON.parse(sessionStorage.getItem('keyword')) || '');
    const [typeIds, setTypeIds] = useState(JSON.parse(sessionStorage.getItem('typeIds') || '{"1": true, "2": true, "3": true}'));
    const [bedrooms, setBedrooms] = useState(JSON.parse(sessionStorage.getItem('bedrooms') || '{"1": true, "2": true, "3": true, "4": true, "5": true}'));
    const [bathrooms, setBathrooms]= useState(JSON.parse(sessionStorage.getItem('bathrooms') || '{"1": true, "2": true, "3": true, "4": true, "5": true}'));

    // for mapping checkboxs
    const [types, setTypes] = useState([]);
    const numberOfBedrooms = ['1', '2', '3', '4', '5'];
    const numberOfBathrooms = ['1', '2', '3', '4', '5'];

    const [listings, setListings] = useState([]);

    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    
    const getTypes = async () => {
        const homeTypes = await getHomeTypes();
        setTypes(homeTypes);
    }

    const getListings = async () => {
        const allListings = await getApprovedListings(keyword, Object.keys(typeIds), Object.keys(bedrooms), Object.keys(bathrooms));
        setListings(allListings);
    }

    const handleKeywordChange = async (event) => {
        setKeyword(event.target.value);
        sessionStorage.setItem('keyword', JSON.stringify(event.target.value));

        if(event.target.value.length === 0) {
            const allListings = await getApprovedListings(event.target.value, Object.keys(typeIds), Object.keys(bedrooms), Object.keys(bathrooms));
            setListings(allListings);
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault();

        const allListings = await getApprovedListings(keyword, Object.keys(typeIds), Object.keys(bedrooms), Object.keys(bathrooms));
        setListings(allListings);
        setPage(1);
    }

    const handleTypeIdsChange = async (event) => {
        const copyTypeIds = {...typeIds};
        if(event.target.checked === false) {
            delete copyTypeIds[event.target.value];
        }
        else {
            copyTypeIds[event.target.value] = true;
        }
        setTypeIds(copyTypeIds);
        sessionStorage.setItem('typeIds', JSON.stringify(copyTypeIds));

        const allListings = await getApprovedListings(keyword, Object.keys(copyTypeIds), Object.keys(bedrooms), Object.keys(bathrooms));
        setListings(allListings);
        setPage(1);
    }

    const handleBedroomsChange = async (event) => {
        const copyBedrooms = {...bedrooms};
        if(event.target.checked === false) {
            delete copyBedrooms[event.target.value];
        }
        else {
            copyBedrooms[event.target.value] = true;
        }
        setBedrooms(copyBedrooms);
        sessionStorage.setItem('bedrooms', JSON.stringify(copyBedrooms));

        const allListings = await getApprovedListings(keyword, Object.keys(typeIds), Object.keys(copyBedrooms), Object.keys(bathrooms));
        setListings(allListings);
        setPage(1);
    }

    const handleBathroomsChange = async (event) => {
        const copyBathrooms = {...bathrooms};
        if(event.target.checked === false) {
            delete copyBathrooms[event.target.value];
        }
        else {
            copyBathrooms[event.target.value] = true;
        }
        setBathrooms(copyBathrooms);
        sessionStorage.setItem('bathrooms', JSON.stringify(copyBathrooms));

        const allListings = await getApprovedListings(keyword, Object.keys(typeIds), Object.keys(bedrooms), Object.keys(copyBathrooms));
        setListings(allListings);
        setPage(1);
    }

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

    useEffect(() => {
        window.scrollTo(0, 0);
        setTabValue('listings');
        sessionStorage.setItem('tabValue', JSON.stringify('listings'));
        getTypes();
        getListings();
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="lg" sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Accordion sx={{marginTop: '20px'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Search and Filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <form onSubmit={handleSearch} style={{width: '70%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <TextField id='keyword' placeholder='Search...' variant='standard' value={keyword} margin='normal'
                                    onChange={handleKeywordChange} sx={{flexGrow: 1}}
                            />
                            <Button type="submit" variant="contained" size="small" endIcon={<SearchIcon />} sx={{marginLeft: '10px'}}>
                                Search
                            </Button>
                        </form>
                        <FormGroup style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} row>
                            <FormLabel component="legend" sx={{marginRight: '10px'}}>Home Types: </FormLabel>
                            {types.map((type, index) => {
                                return (
                                    <FormControlLabel key={index} label={type.name}
                                        control={<Checkbox checked={typeIds[type.id] ? true : false} value={type.id} onChange={handleTypeIdsChange}/>} 
                                    />
                                )
                            })}
                        </FormGroup>
                        <FormGroup style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} row>
                            <FormLabel component="legend" sx={{marginRight: '10px'}}>Bedrooms: </FormLabel>
                            {numberOfBedrooms.map((bed, index) => {
                                return (
                                    <FormControlLabel key={index} label={bed}
                                        control={<Checkbox checked={bedrooms[bed] ? true : false} value={bed} onChange={handleBedroomsChange}/>} 
                                    />
                                )
                            })}
                        </FormGroup>
                        <FormGroup style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} row>
                            <FormLabel component="legend" sx={{marginRight: '10px'}}>Bathrooms: </FormLabel>
                            {numberOfBathrooms.map((bath, index) => {
                                return (
                                    <FormControlLabel key={index} label={bath}
                                        control={<Checkbox checked={bathrooms[bath] ? true : false} value={bath} onChange={handleBathroomsChange}/>} 
                                    />
                                )
                            })}    
                        </FormGroup>
                    </Box>
                </AccordionDetails>
            </Accordion>
            {listings.length ?
            <Box sx={{display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                <Grid container spacing={3} sx={{alignItems: 'stretch', marginTop: '1px'}}>
                    {listings[page - 1].map(({ address, bedrooms, bathrooms, type, price, size, id, imageUrl }, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Item style={{height: '100%', cursor: 'pointer'}} className='listing' onClick={() => handleOnClick(id)}>
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
                                </Item>
                            </Grid>
                        )
                    })}
                </Grid>
                <Pagination sx={{marginTop: '50px', marginBottom: '50px'}} 
                            count={listings.length}
                            page={page} color="primary" onChange={handlePageChange} 
                />
            </Box>
            : <h2 className='small-title' style={{marginTop: '20px'}}>No result.</h2> }
        </Container>
    );
}

export default Listings;