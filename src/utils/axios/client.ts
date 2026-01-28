import { BACKEND_URL } from '@/constants/env.constant';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { BackendApiError } from './base';

const createAPIClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 1e4,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
      if (error.response) {
        const message = error.response.data?.message || error.message;

        throw new BackendApiError(message, error.response.status, error.response.data);
      }

      if (error.request) {
        throw new BackendApiError('No response received from server');
      }

      throw error;
    }
  );

  return instance;
};

const BackendClient = createAPIClient();

export { BackendClient };
