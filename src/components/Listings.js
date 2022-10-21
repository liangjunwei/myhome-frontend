import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, FormGroup, FormLabel, FormControlLabel, 
         Checkbox, Accordion, AccordionSummary, Typography,
         AccordionDetails, styled, Paper, Pagination,
         Grid, CardMedia, CardContent, Button, CircularProgress } from '@mui/material';
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

    const [page, setPage] = useState(JSON.parse(sessionStorage.getItem('listingPage')) || 1);
    const handlePageChange = (event, value) => {
        setPage(value);
        sessionStorage.setItem('listingPage', JSON.stringify(value));
    };

    const [loading, setLoading] = useState(true);

    const getTypes = async () => {
        const homeTypes = await getHomeTypes();
        setTypes(homeTypes);
    }

    const getListings = async (keyword, typeIds, bedrooms, bathrooms, page) => {
        const allListings = await getApprovedListings(keyword, Object.keys(typeIds), Object.keys(bedrooms), Object.keys(bathrooms));
        setListings(allListings);
        setPage(page);
        sessionStorage.setItem('listingPage', JSON.stringify(page));

        setLoading(true);
        const stopLoading = () => {
            setLoading(false);
            clearTimeout(loadingTimeout);
        }
        const loadingTimeout = setTimeout(stopLoading, 3000);
    }

    const handleKeywordChange = async (event) => {
        setKeyword(event.target.value);

        if(event.target.value.length === 0) {
            getListings(event.target.value, typeIds, bedrooms, bathrooms, page);
            sessionStorage.setItem('keyword', JSON.stringify(event.target.value));
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        getListings(keyword, typeIds, bedrooms, bathrooms, 1);
        sessionStorage.setItem('keyword', JSON.stringify(keyword));
        sessionStorage.setItem('typeIds', JSON.stringify(typeIds));
        sessionStorage.setItem('bedrooms', JSON.stringify(bedrooms));
        sessionStorage.setItem('bathrooms', JSON.stringify(bathrooms));
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
        getListings(keyword, typeIds, bedrooms, bathrooms, page);
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="lg" sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center'}}>
            <Accordion sx={{marginTop: '20px', width: '100%'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Search and Filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <form onSubmit={handleSearch} style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <TextField id='keyword' placeholder='Search...' variant='standard' value={keyword} margin='normal'
                                    onChange={handleKeywordChange} sx={{width: '70%'}}
                            />
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
                            <Button type="submit" variant="contained" endIcon={<SearchIcon />} sx={{width: '40%', marginTop: '20px'}}>
                                Search
                            </Button>
                        </form>
                    </Box>
                </AccordionDetails>
            </Accordion>
            {loading ? 
                <div hidden={!loading}><CircularProgress sx={{marginTop: '100px'}}/></div>
                :
                <div style={{width: '100%'}}>
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
                </div>
            }
        </Container>
    );
}

export default Listings;