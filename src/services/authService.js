import axios from 'axios';

function loginService(credentials) {
    return axios.post('/api/auth/login', credentials).then(({data}) => {
        return data;
    });
}

function registerService(userDetails) {
    return axios.post(`/api/auth/register`, userDetails).then(({data}) => data);
}

export default {loginService, registerService};
