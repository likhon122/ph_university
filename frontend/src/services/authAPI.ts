import api from './api';

export const authAPI = {
  login: (credentials: { id: string; password: string }) =>
    api.post('/auth/login', credentials),

  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh-token', { refreshToken }),

  changePassword: (passwordData: { oldPassword: string; newPassword: string }) =>
    api.post('/auth/change-password', passwordData),

  forgotPassword: (id: string) =>
    api.post('/auth/forgot-password', { id }),

  resetPassword: (resetData: { id: string; newPassword: string; token: string }) =>
    api.post('/auth/reset-password', resetData),
};