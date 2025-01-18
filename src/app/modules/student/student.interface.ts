import { Types } from 'mongoose';

export type TStudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardianDetails = {
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
};

export type TCreateStudent = {
  id: string;
  user: Types.ObjectId;
  name: TStudentName;
  gender: { type: ['male' | 'female'] };
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: TGuardianDetails;
  localGuardian: TGuardianDetails;
  profileImage?: string;
  designation: string;
  academicDepartment: Types.ObjectId;
  admissionSemester: Types.ObjectId;
  role: string;
  isDeleted: boolean;
};
