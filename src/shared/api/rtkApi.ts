import { $api } from './api';

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
        return Promise.reject(axiosError);
    }
};

export default axiosBaseQuery;
