import axios from "axios";
const axiosRetry = require("axios-retry").default;

// axiosInstance allows us to configure defaults such as timeout, baseURL and retries
export const axiosInstance = axios.create({
    timeout: 20000, // timeout of 10 seconds
});

axiosRetry(axiosInstance, {
    retries: 5, 
    retryDelay: (retryCount) => {
        console.log(`Retry attempt: ${retryCount}`);
        return retryCount * 1000; // Delay before retrying
    },
    retryCondition: (error) => {
        // Retry only on network errors or 5xx status codes(network down)
        return error.code === "ECONNABORTED" || axiosRetry.isNetworkOrIdempotentRequestError(error);
    },
});

// A single, consistent way to call any HTTP endpoint in the app
export const apiConnector = async (method, url, bodyData = null, headers = {}, params = null) => {
    try {
        const response = await axiosInstance({
            method: method,
            url: url,
            data: bodyData,
            headers: headers,
            params: params,
        });
        return response;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error("API call error: ", error.response.status, error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("API call error: No response received", error.request);
        } else {
            // Something happened in setting up the request
            console.error("API call error: ", error.message);
        }
        throw error;
    }
};
