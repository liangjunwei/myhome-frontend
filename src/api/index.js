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
export const sendMessage = async (token, listingId, senderId, receiverId, content) => {
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
                senderId,
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