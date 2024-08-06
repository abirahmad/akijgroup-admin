import { getAuthData } from "@/redux/actions/auth-action";
import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IAxiosCall {
    method?: string;
    url: string;
    data?: any;
}

const BASE_URL = process.env.BASE_URL;

const API = Axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get Auth Data
const authData = getAuthData();

const AxiosCall = async ({ method = 'get', url, data = null }: IAxiosCall): Promise<any> => {
    // Create the request configuration
    const config: AxiosRequestConfig = {
        method,
        url,
        data,
        headers: authData 
            ? { ...API.defaults.headers.common, Authorization: `Bearer ${authData.accessToken}` } 
            : API.defaults.headers.common,
    };

    try {
        const response: AxiosResponse = await API(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default AxiosCall;
