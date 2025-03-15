import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshTokenCommand, RefreshTokenResponse } from '../types/Token';

const BASE_URL = 'http://localhost:5000/api/v1'; // Adjust to your API URL

class ApiClient {
  private client: AxiosInstance;
  private refreshingPromise: Promise<AxiosResponse<RefreshTokenResponse>> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newTokens = await this.refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newTokens.data.accessToken}`;
          return this.client(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<AxiosResponse<RefreshTokenResponse>> {
    if (this.refreshingPromise) return this.refreshingPromise;

    try {
      const accessToken = await AsyncStorage.getItem('jwtToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken || !accessToken) throw new Error('No tokens available');

      this.refreshingPromise = this.client.post<RefreshTokenResponse>('/Token/Refresh', {
        accessToken,
        refreshToken,
      } as RefreshTokenCommand);

      const response = await this.refreshingPromise;
      await AsyncStorage.setItem('jwtToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      return response;
    } finally {
      this.refreshingPromise = null;
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export default new ApiClient();