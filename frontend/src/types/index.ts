export interface User {
  id: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  passwordChangeAt?: Date;
}

export interface Student {
  id: string;
  user: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: GuardianDetails;
  localGuardian: GuardianDetails;
  profileImage: string | null;
  designation: string;
  academicDepartment: string;
  admissionSemester: string;
  role: string;
  isDeleted: boolean;
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

export interface Faculty {
  id: string;
  user: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  designation: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string | null;
  academicDepartment: string;
  role: string;
  isDeleted: boolean;
}

export interface Admin {
  id: string;
  user: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  designation: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string | null;
  role: string;
  isDeleted: boolean;
}

export interface AcademicSemester {
  _id: string;
  name: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
}

export interface AcademicFaculty {
  _id: string;
  name: string;
}

export interface AcademicDepartment {
  _id: string;
  name: string;
  academicFaculty: string;
}

export interface Course {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: PreRequisiteCourse[];
}

export interface PreRequisiteCourse {
  course: string;
  isDeleted: boolean;
}

export interface SemesterRegistration {
  _id: string;
  academicSemester: string;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
}

export interface OfferedCourse {
  _id: string;
  semesterRegistration: string;
  course: string;
  faculty: string;
  section: number;
  maxCapacity: number;
  days: string[];
  startTime: string;
  endTime: string;
}