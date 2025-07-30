// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://akil-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
