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
  email: { type: String, unique: true },
  contactNo: { type: String },
  relation: { type: String },
  address: {
    presentAddress: String,
    permanentAddress: String,
  },
});

const studentSchema = new Schema<TCreateStudent>(
  {
    id: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true,
    },
    name: studentName,
    gender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: String, required: true },
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
    academicDepartment: { type: String, required: true },
    admissionSemester: { type: String, required: true },
    role: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Student = model<TCreateStudent>('student', studentSchema);

export default Student;
