import axios from 'axios';
require('dotenv').config()
const instance = axios.create({
    baseURL: "http://localhost:8001",
})

export default instance