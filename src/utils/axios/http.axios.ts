import { AxiosRequestConfig } from 'axios';
import { BackendClinet } from './client.axios';

const bGET = async <Body>(url: string, config?: AxiosRequestConfig): Promise<Body> => {
  const response = await BackendClinet.get<Body>(url, config);

  return response.data;
};

const bPOST = async <Body, Response>(
  url: string,
  data?: Body,
  config?: AxiosRequestConfig
): Promise<Response> => {
  const response = await BackendClinet.post<Response>(url, data, config);

  return response.data;
};

const bPUT = async <Body, Response>(
  url: string,
  data?: Body,
  config?: AxiosRequestConfig
): Promise<Response> => {
  const response = await BackendClinet.put<Response>(url, data, config);

  return response.data;
};

const bDELETE = async <Response>(
  url: string,
  config?: AxiosRequestConfig
): Promise<Response> => {
  const response = await BackendClinet.delete<Response>(url, config);

  return response.data;
};

export { bGET, bPOST, bPUT, bDELETE };
