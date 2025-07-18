import axios from 'axios';
import type { StudentFormData } from '../validation/studentValidation';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateStudentRequest {
  password: string;
  student: StudentFormData;
}

export interface Student {
  _id: string;
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: string;
  guardian: any;
  localGuardian: any;
  designation: string;
  academicDepartment: string;
  admissionSemester: string;
}

export const studentService = {
  // Create a new student
  createStudent: async (data: CreateStudentRequest) => {
    const response = await api.post('/users/create-student', data);
    return response.data;
  },

  // Get all students
  getAllStudents: async () => {
    const response = await api.get('/students/get-all-students');
    return response.data;
  },

  // Add student (alternative endpoint)
  addStudent: async (student: StudentFormData) => {
    const response = await api.post('/students/add-student', { student });
    return response.data;
  },
};

export default studentService;