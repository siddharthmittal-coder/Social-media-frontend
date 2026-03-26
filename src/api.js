import axios from 'axios';
const API = axios.create({
  baseURL : 'https://social-media-backend-es0d.onrender.com/api',
})
export default API;
