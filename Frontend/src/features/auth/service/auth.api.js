import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const api = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
});

export const register = async ({username,email,password}) => {
    try {
        const response = await api.post('/api/auth/register', {username,email,password});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async ({email,password}) => {
    try {
        const response = await api.post('/api/auth/login', {email,password});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/api/auth/logout');
        return response.data;
    } catch (error) {        
        throw error;
    }
};


export const getMe = async () => {
    try {
        const response = await api.get('/api/auth/get-me');
        return response.data;
    } catch (error) {
        throw error;
    }
};
