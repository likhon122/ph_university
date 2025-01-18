import { Schema, model } from 'mongoose';
import {
  TCreateStudent,
  TGuardianDetails,
  TStudentName,
} from './student.interface';

const studentName = new Schema<TStudentName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardianDetails>({
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String },
  contactNo: { type: String },
  relation: { type: String },
  address: {
    presentAddress: String,
    permanentAddress: String,
  },
});

const studentSchema = new Schema<TCreateStudent>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true,
    },
    name: studentName,
    gender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    guardian: guardianSchema,
    localGuardian: guardianSchema,
    profileImage: { type: String },
    designation: { type: String, required: true },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_department',
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academic_semester',
    },
    role: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Student = model<TCreateStudent>('student', studentSchema);

export default Student;
