// User types
export interface User {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface CreateUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

// Student types
export interface StudentName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface GuardianDetails {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email?: string;
  contactNo: string;
  relation: string;
  address: {
    presentAddress: string;
    permanentAddress: string;
  };
}

export interface Student {
  _id?: string;
  id: string;
  user: string; // ObjectId as string
  name: StudentName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: GuardianDetails;
  localGuardian: GuardianDetails;
  profileImage?: string;
  designation: string;
  academicDepartment: string;
  admissionSemester: string;
  role: string;
  isDeleted: boolean;
}

export interface CreateStudent {
  name: StudentName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: GuardianDetails;
  localGuardian: GuardianDetails;
  profileImage?: string;
  designation: string;
  academicDepartment: string;
  admissionSemester: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  successMessage?: string;
  statusCode: number;
  data: T;
  nextUrl?: any;
}

export interface CreateStudentRequest {
  password: string;
  student: CreateStudent;
}

export interface CreateStudentResponse {
  status: string;
  message: string;
  data: {
    newUser: User;
    newStudent: Student;
  };
}