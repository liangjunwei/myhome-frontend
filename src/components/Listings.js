import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, FormGroup, FormLabel, FormControlLabel, 
         Checkbox, Button, Accordion, AccordionSummary, Typography,
         AccordionDetails } from '@mui/material';
import { getHomeTypes } from '../api';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Listings = ({ setTabValue }) => {

    // search string and filter arrays
    const [keyword, setKeyword] = useState(JSON.parse(sessionStorage.getItem('keyword')) || '');
    const [typeIds, setTypeIds] = useState(JSON.parse(sessionStorage.getItem('typeIds') || '{"1": true, "2": true, "3": true}'));
    const [bedrooms, setBedrooms] = useState(JSON.parse(sessionStorage.getItem('bedrooms') || '{"1": true, "2": true, "3": true, "4": true, "5": true}'));
    const [bathrooms, setBathrooms]= useState(JSON.parse(sessionStorage.getItem('bathrooms') || '{"1": true, "2": true, "3": true, "4": true, "5": true}'));

    // for mapping checkboxs
    const [types, setTypes] = useState([]);
    const numberOfBedrooms = ['1', '2', '3', '4', '5'];
    const numberOfBathrooms = ['1', '2', '3', '4', '5'];
    
    const getTypes = async () => {
        const homeTypes = await getHomeTypes();
        setTypes(homeTypes);
    }

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
        sessionStorage.setItem('keyword', JSON.stringify(event.target.value));
    }

    const handleTypeIdsChange = (event) => {
        const copyTypeIds = {...typeIds};
        if(event.target.checked === false) {
            delete copyTypeIds[event.target.value];
        }
        else {
            copyTypeIds[event.target.value] = true;
        }
        setTypeIds(copyTypeIds);
        sessionStorage.setItem('typeIds', JSON.stringify(copyTypeIds));
    }

    const handleBedroomsChange = (event) => {
        const copyBedrooms = {...bedrooms};
        if(event.target.checked === false) {
            delete copyBedrooms[event.target.value];
        }
        else {
            copyBedrooms[event.target.value] = true;
        }
        setBedrooms(copyBedrooms);
        sessionStorage.setItem('bedrooms', JSON.stringify(copyBedrooms));
    }

    const handleBathroomsChange = (event) => {
        const copyBathrooms = {...bathrooms};
        if(event.target.checked === false) {
            delete copyBathrooms[event.target.value];
        }
        else {
            copyBathrooms[event.target.value] = true;
        }
        setBathrooms(copyBathrooms);
        sessionStorage.setItem('bathrooms', JSON.stringify(copyBathrooms));
    }

    useEffect(() => {
        setTabValue('listings');
        getTypes();
        // eslint-disable-next-line
    }, []);

    console.log('keyword: ', keyword);
    console.log('typeid: ', Object.keys(typeIds));
    console.log('bedrooms: ', Object.keys(bedrooms));
    console.log('bathrooms: ', Object.keys(bathrooms));

    return (
        <Container maxWidth="lg" sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Accordion sx={{marginTop: '20px'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Search and Filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box component="form" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <TextField sx={{width: '70%'}} id='keyword' label='Keyword' variant='outlined' value={keyword}
                                margin="normal" onChange={handleKeywordChange}
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
                        <Button variant="contained" type='submit'>Search</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Box>

            </Box>
        </Container>
    );
}

export default Listings;