import axios from "axios";

const instance =axios.create({
    baseURL:"https://conferencing-backendd-2.onrender.com/",
    timeout:2000,
});

export default instance;
