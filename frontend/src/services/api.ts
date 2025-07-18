import axios from 'axios';
import { ApiResponse, Student, CreateStudentRequest, CreateStudentResponse } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Student API endpoints
export const studentAPI = {
  // Get all students
  getAllStudents: async (): Promise<Student[]> => {
    try {
      const response = await api.get<ApiResponse<Student[]>>('/students/get-all-students');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  // Add student (direct to students endpoint)
  addStudent: async (student: Partial<Student>): Promise<Student> => {
    try {
      const response = await api.post<ApiResponse<Student>>('/students/add-student', {
        student
      });
      return response.data.data;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  },

  // Create student with user (via users endpoint)
  createStudentWithUser: async (requestData: CreateStudentRequest): Promise<CreateStudentResponse> => {
    try {
      const response = await api.post<CreateStudentResponse>('/users/create-student', requestData);
      return response.data;
    } catch (error) {
      console.error('Error creating student with user:', error);
      throw error;
    }
  },
};

export default api;