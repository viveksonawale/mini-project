import apiClient from './apiClient';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ORGANIZER" | "PARTICIPANT";
  };
}

export const authApi = {
  login: async (credentials: Record<string, string>) => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
  signup: async (userData: { name: string; email: string; password: string; role: string }) => {
    const response = await apiClient.post<LoginResponse>('/auth/signup', userData);
    return response.data;
  },
  getMe: async () => {
    const response = await apiClient.get<LoginResponse['user']>('/auth/me');
    return response.data;
  },
};
