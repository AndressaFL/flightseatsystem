import axios from "axios";
//Axios is an HTTP client library based on promises that makes it simple to send asynchronous HTTP requests
// to REST endpoints. This endpoint in our case is the JSONPlaceholder Posts API, to which we will make GET,
// POST, and DELETE requests.

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    'credentials': 'include',
    'Access-Control-Allow-Origin' : process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});