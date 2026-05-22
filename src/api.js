import axios from 'axios';
const API = axios.create({
  baseURL : 'https://social-media-backend-1-rln7.onrender.com/api',
})
export default API;
