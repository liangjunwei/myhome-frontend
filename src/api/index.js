import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api';

// login
export const userLogin = async (username, password) => {
    const url = `${BASE_URL}/users/login`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// register
export const createAccount = async (username, password) => {
    const url = `${BASE_URL}/users/register`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// get inbox
export const getInboxMessages = async (token) => {
    const url = `${BASE_URL}/messages/receive`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        const constructedData = [];
        for(let i = 0; i < data.length; i += 10) {
            constructedData.push(data.slice(i, i + 10));
        }

        return constructedData;
    }
    catch(e) {
        console.error(e);
    }
}

// get sent messages
export const getSentMessages = async (token) => {
    const url = `${BASE_URL}/messages/send`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        
        const constructedData = [];
        for(let i = 0; i < data.length; i += 10) {
            constructedData.push(data.slice(i, i + 10));
        }

        return constructedData;
    }
    catch(e) {
        console.error(e);
    }
}

// update message status
export const updateMessageStatus = async (token, id) => {
    const url = `${BASE_URL}/messages/update-status/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// send message
export const sendMessage = async (token, listingId, receiverId, content) => {
    const url = `${BASE_URL}/messages/create`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                listingId,
                receiverId,
                content
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// get home types
export const getHomeTypes = async () => {
    const url = `${BASE_URL}/types`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// get approved listings
export const getApprovedListings = async (searchString, typeId, bedrooms, bathrooms) => {
    const url = `${BASE_URL}/listings/approved`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchString,
                typeId,
                bedrooms,
                bathrooms
            })
        });
        const data = await response.json();

        for(let i = 0; i < data.length; i++) {
            const { imageUrl } = await getCoverImageUrl(data[i].id);
            data[i]["imageUrl"] = imageUrl;
        }

        const constructedData = [];
        for(let i = 0; i < data.length; i += 12) {
            constructedData.push(data.slice(i, i + 12));
        }

        return constructedData;
    }
    catch(e) {
        console.error(e);
    }
}

// upload images
export const uploadImages = async (formData) => {
    const url = `${BASE_URL}/images/upload`;

    try {
        const data = await axios.post(url, formData, { headers: {'Content-Type': 'multipart/form-data'}});
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// get cover image url by listing id
const getCoverImageUrl = async (listingId) => {
    const url = `${BASE_URL}/images/cover/${listingId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// get all images by listing id
export const getAllImages = async (listingId) => {
    const url = `${BASE_URL}/images/${listingId}`;

    try {
        const response = await fetch(url);
        const { allImages } = await response.json();

        return allImages;
    }
    catch(e) {
        console.error(e);
    }
}

// get listing by id
export const getListingById = async (id) => {
    const url = `${BASE_URL}/listings/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// get listings by user id
export const getListingsByUser = async (token) => {
    const url = `${BASE_URL}/listings/user`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        for(let i = 0; i < data.length; i++) {
            const { imageUrl } = await getCoverImageUrl(data[i].id);
            data[i]["imageUrl"] = imageUrl;
        }

        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// create listing
export const createListing = async (token, address, typeId, price, bedrooms, bathrooms, size, parking, pets) => {
    const url = `${BASE_URL}/listings/create`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                address,
                typeId,
                price,
                bedrooms,
                bathrooms,
                size,
                parking,
                pets
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// update listing
export const updateListing = async (token, address, typeId, price, bedrooms, bathrooms, size, parking, pets, id) => {
    const url = `${BASE_URL}/listings/update/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                address,
                typeId,
                price,
                bedrooms,
                bathrooms,
                size,
                parking,
                pets
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// get not approved yet listings
export const getNotApprovedYetListings = async (token) => {
    const url = `${BASE_URL}/listings/not-approved`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        for(let i = 0; i < data.length; i++) {
            const { imageUrl } = await getCoverImageUrl(data[i].id);
            data[i]["imageUrl"] = imageUrl;
        }

        const constructedData = [];
        for(let i = 0; i < data.length; i += 12) {
            constructedData.push(data.slice(i, i + 12));
        }

        return constructedData;
    }
    catch(e) {
        console.error(e);
    }
}

// approve listing by id
export const approveListingById = async (token, id) => {
    const url = `${BASE_URL}/listings/approve/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// disapprove listing by id
export const disapproveListingById = async (token, id) => {
    const url = `${BASE_URL}/listings/disapprove/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// owner check for update listing page
export const listingOwnerCheck = async (token, id) => {
    const url = `${BASE_URL}/listings/owner-check/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const { owner } = await response.json();
        return owner;
    }
    catch(e) {
        console.error(e);
    }
}

// set cover image
export const setCoverImageById = async (token, id, oldCoverId) => {
    const url = `${BASE_URL}/images/set-cover/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                oldCoverId
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// delete image by id
export const deleteImageById = async (token, id) => {
    const url = `${BASE_URL}/images/delete/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}