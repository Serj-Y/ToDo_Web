import { $api } from './api';
import { REQUEST_QUEUE } from '../consts/localStorage';

type RequestType = {
    url: any,
    method: any,
    data: any,
    params: any,
    headers: any,
    body: any,
}

let isOffline = false;
const requestQueue:Array<RequestType> = [];

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => async ({
    url, method, data, params, headers, body,
}: any) => {
    try {
        const result = await $api({
            url: baseUrl + url,
            method,
            data,
            params,
            headers,
            body,
        } as any);
        return Promise.resolve(result);
    } catch (axiosError) {
        if (!navigator.onLine) {
            isOffline = true;
            // Store the failed request in the queue
            requestQueue.push({
                url: baseUrl + url,
                method,
                data,
                params,
                headers,
                body,
            });
            localStorage.setItem(REQUEST_QUEUE, JSON.stringify(requestQueue));
        }
        return Promise.reject(axiosError);
    }
};
// Function to retry failed requests
const retryRequests = async () => {
    if (isOffline && navigator.onLine) {
        isOffline = false;
        // Retry all requests in the queue
        while (requestQueue.length > 0) {
            const {
                url, method, data, params, headers, body,
            }: any = requestQueue.shift();
            try {
                // eslint-disable-next-line no-await-in-loop
                await $api({
                    url,
                    method,
                    data,
                    params,
                    headers,
                    body,
                } as any);
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
    isOffline = true;
});
export default axiosBaseQuery;
