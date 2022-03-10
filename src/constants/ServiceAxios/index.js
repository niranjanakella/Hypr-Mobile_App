import axios from 'axios';
import Toast from 'react-native-toast-message';

import { getUserAccessTokenFromStorage } from "../../utils/asyncstorage"
import store from '../../store';
import { logOut } from '../../actions/auth';
const axiosInstance = axios.create({
    baseURL: 'http://10.0.3.2:9002/',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
    async function (config) {
        //console.log('config', config);
        const token = await getUserAccessTokenFromStorage();

        if (token) config.headers.Authorization = `${token}`;
        // console.log("config in request", config);
        return config;
    },
    // function (error) {
    //     return Promise.reject(error);
    // }
);

axiosInstance.interceptors.response.use(
    async function (result) {
        return result
    },
    function (error) {

        console.log("error in interceptors.response", error);
        if (error.response.status === 401) {
            console.log("error response if part", error);
            store.dispatch(logOut())
            return Promise.reject("Session expired. Please login.")
        }
        else {
            console.log("error response else part", error.response);
            return Promise.reject(error);
        }
    }
)

export const GET = async (url, params) => {
    let getRes = await axiosInstance.get(
        url,
        {
            params: params
        }
    );
    if (getRes.status === 200) {
        return { data: getRes.data, status: true };
    } else {
        return { message: getRes.data.message, status: false };
    }
};



export const DELETE = async (url, params) => {
    let getRes = await axiosInstance.delete(url, { params });

    if (getRes.status === 200) {
        return { data: getRes.data, status: true };
    } else {
        return { message: getRes.data.message, status: false };
    }
};

export const POST = async (url, body, options) => {
    let getRes = await axiosInstance.post(url, body, options);
    if (getRes.status === 200 || getRes.status === 201) {
        return { data: getRes.data, status: true };
    } else {
        console.log(getRes)
        return { message: getRes, status: false };
    }
};

export const PUT = async (url, body, options) => {
    let getRes = await axiosInstance.put(url, body, options);
    if (getRes.status === 200) {
        return { data: getRes.data, status: true };
    } else {
        return { message: getRes.data.message, status: false };
    }
};
