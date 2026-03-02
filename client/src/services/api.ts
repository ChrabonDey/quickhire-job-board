import axios from 'axios';
import { Job, Application } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Request Interceptor to add Auth Token
axios.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export const authService = {
    login: async (credentials: any) => {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        if (response.data.token && typeof window !== 'undefined') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    register: async (userData: any) => {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        if (response.data.token && typeof window !== 'undefined') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    getUser: () => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        }
        return null;
    }
};

export const jobService = {
    getAll: async (params?: Record<string, unknown>) => {
        const response = await axios.get<Job[]>(`${API_URL}/jobs`, { params });
        return response.data;
    },
    getById: async (id: string) => {
        const response = await axios.get<Job>(`${API_URL}/jobs/${id}`);
        return response.data;
    },
    create: async (jobData: Partial<Job>) => {
        const response = await axios.post<Job>(`${API_URL}/jobs`, jobData);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await axios.delete(`${API_URL}/jobs/${id}`);
        return response.data;
    },
};

export const applicationService = {
    submit: async (applicationData: Partial<Application>) => {
        const response = await axios.post<Application>(`${API_URL}/applications`, applicationData);
        return response.data;
    },
    getAll: async () => {
        const response = await axios.get<Application[]>(`${API_URL}/applications`);
        return response.data;
    },
};
