import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const storageData = JSON.parse(localStorage.getItem('user'));
        if (storageData) {
            config.headers['Authorization'] = storageData.token_type +' '+ storageData.access_token; 

        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function(error) {
    return Promise.reject(error);
});

