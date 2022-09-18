import axios from "axios";

const http = axios.create({
    baseURL: "https://instagram-clone-api.vercel.app/api/v1",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "https://instagram-clone-api.vercel.app/api/v1"
    },
    withCredentials: true
});

export function setAuthHeader() {
    const token = localStorage.getItem("token");
    http.defaults.headers.common["Authorization"] = token;
}

export default http;