import api from './api';

export const studentAPI = {
  getAllStudents: (params?: any) =>
    api.get('/students', { params }),

  getStudentById: (id: string) =>
    api.get(`/students/${id}`),

  updateStudent: (id: string, data: any) =>
    api.patch(`/students/${id}`, data),

  deleteStudent: (id: string) =>
    api.delete(`/students/${id}`),
};