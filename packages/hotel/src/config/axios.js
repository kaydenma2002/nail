import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
    timeout: 5000, // Set a timeout for requests (optional)
    headers: {
        'Content-Type': 'application/json',
        // You can add other headers here if needed
    },
});

export default instance;