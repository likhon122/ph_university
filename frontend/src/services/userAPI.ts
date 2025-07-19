import api from './api';

export const userAPI = {
  getMe: () =>
    api.get('/users/me'),

  createStudent: (studentData: FormData) =>
    api.post('/users/create-student', studentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  createFaculty: (facultyData: FormData) =>
    api.post('/users/create-faculty', facultyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  createAdmin: (adminData: FormData) =>
    api.post('/users/create-admin', adminData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  updateStatus: (id: string, status: string) =>
    api.patch(`/users/update-status/${id}`, { status }),
};