import axios from "axios";

export default axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});