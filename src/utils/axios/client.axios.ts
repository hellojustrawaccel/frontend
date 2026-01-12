import { BACKEND_URL } from '@/constants/env.constant';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { BackendApiError } from './base.axios';

const createAPIClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 1e4,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use((config) => {
    // auth token [config.headers.Authorization = `Bearer ${token}`]

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        throw new BackendApiError(error.message, error.response.status, error.response.data);
      }

      if (error.request) {
        throw new BackendApiError('No response received from server');
      }

      throw error;
    }
  );

  return instance;
};

const BackendClinet = createAPIClient();

export { BackendClinet };
