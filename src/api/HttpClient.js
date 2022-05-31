import axios from "axios";


const BackendAPI = axios.create({
    baseURL:"http://localhost:8080",
    withCredentials:false
});


export default BackendAPI;