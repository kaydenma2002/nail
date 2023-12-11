import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers here if needed
  },
});

// Add a request interceptor to include the bearer token
instance.interceptors.request.use(
  config => {
    // Get the token from wherever you have stored it (e.g., localStorage)
    const token = localStorage.getItem('token');

    // If a token is available, add it to the Authorization header
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default instance;


