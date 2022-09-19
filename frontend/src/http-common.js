import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/api/v1"
    },
    withCredentials: true
});

export function setAuthHeader() {
    const token = localStorage.getItem("token");
    http.defaults.headers.common["Authorization"] = token;
}

export default http;