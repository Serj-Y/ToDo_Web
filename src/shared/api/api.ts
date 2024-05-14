import axios from 'axios';
import { BaseUrl } from '../consts/baseUrl';
import { ACCESS_TOKEN, REFRESH_TOKEN, REQUEST_QUEUE } from '../consts/localStorage';

const requestQueue: any[] = JSON.parse(localStorage.getItem(REQUEST_QUEUE) || '[]');

export const baseApi = axios.create({
    baseURL: BaseUrl,
});

type TokenResponse = {
    refreshToken: string;
    accessToken: string;
};

// eslint-disable-next-line no-nested-ternary
export const errorCatch = (error: any) => (error.response && error.response.data
    ? typeof error.response.data.message === 'object'
        ? error.response.data.message[0]
        : error.response.data.message
    : error.message);

export const getNewToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    const response = await axios.put<TokenResponse>(
        `${BaseUrl}auth/access-token`,
        { refreshToken },
    );

    if (response.data.accessToken) {
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
    }

    return response;
};

const INSTANCE_TIMEOUT = 1500;
const INSTANCE_HEADER = {
    'Content-Type': 'application/json',
};

export const $api = axios.create({
    baseURL: BaseUrl,
    timeout: INSTANCE_TIMEOUT,
    headers: INSTANCE_HEADER,
});

$api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (!navigator.onLine) {
        requestQueue.push({
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers,
        });
        localStorage.setItem(REQUEST_QUEUE, JSON.stringify(requestQueue));
    }
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (
            (error.response?.status === 401
                || errorCatch(error) === 'jwt expired'
                || errorCatch(error) === 'jwt must be provided')
            && error.config
            && !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                await getNewToken();
                return $api.request(originalRequest);
            } catch (err: any) {
                if (errorCatch(err) === 'jwt expired') {
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                }
            }
        }
        throw error.response?.status;
    },

);
// Function to retry failed requests
const retryRequests = async () => {
    if (navigator.onLine && requestQueue.length > 0) {
        // Retry all requests in the queue
        while (requestQueue.length > 0) {
            const requestData = requestQueue.shift();
            try {
                // eslint-disable-next-line no-await-in-loop
                await $api.request(requestData).then(() => {
                    localStorage.setItem(REQUEST_QUEUE, JSON.stringify(requestQueue));
                });
            } catch (error) {
                // Handle retry failure
                console.error('Failed to retry request:', error);
            }
        }
    }
};

// Listen for online/offline events to retry requests
window.addEventListener('online', retryRequests);
window.addEventListener('offline', () => {
    // Handle offline mode
    console.log('Application is offline');
});
