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

// get all image urls by listing id
export const getAllImageUrls = async (listingId) => {
    const url = `${BASE_URL}/images/${listingId}`;

    try {
        const response = await fetch(url);
        const { imageUrls } = await response.json();

        return imageUrls;
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