import axios from 'axios';
import { BASE_URL } from '../const/BASE_URL';
import { USER_LOCAL_STORAGE_KEY } from '../const/localstorage';

export const $api = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     authorization: localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '',
    // },
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '';
    }
    return config;
});
