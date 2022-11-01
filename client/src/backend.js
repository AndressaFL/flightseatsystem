import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    'credentials': 'include',
    'Access-Control-Allow-Origin' : process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});