import httpApi from './http';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const apiClient = async <T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
  try {
    const response = await httpApi.request<T>({
      url: endpoint,
      ...options,
    });

    return response;
  } catch (err) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }
};