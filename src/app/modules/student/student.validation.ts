import { z } from 'zod';

// Student Name Validation
export const studentNameValidation = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required. Please enter the student first name.'),
  middleName: z
    .string()
    .min(1, 'Middle name is required. Please enter the student middle name.'),
  lastName: z
    .string()
    .min(1, 'Last name is required. Please enter the student last name.'),
});

// Guardian Schema Validation
export const guardianSchemaValidation = z.object({
  name: z.object({
    firstName: z
      .string()
      .min(1, 'Guardian first name is required. Please provide it.'),
    middleName: z
      .string()
      .min(1, 'Guardian middle name is required. Please provide it.'),
    lastName: z
      .string()
      .min(1, 'Guardian last name is required. Please provide it.'),
  }),
  email: z
    .string()
    .email('Invalid email format. Please enter a valid email address.')
    .optional(),
  contactNo: z.string().min(1, 'Guardian contact number must be provided.'),
  relation: z
    .string()
    .min(1, 'Please specify the guardian relation to the student.'),
  address: z.object({
    presentAddress: z
      .string()
      .min(1, 'Present address is required for the guardian.'),
    permanentAddress: z
      .string()
      .min(1, 'Permanent address is required for the guardian.'),
  }),
});

// Create Student Validation
const createStudentValidation = z.object({
  name: studentNameValidation,
  gender: z.enum(['male', 'female'], {
    message: 'Invalid gender. Please choose either "male" or "female".',
    required_error: 'Gender is required to register a student.',
  }),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required. Please enter it in YYYY-MM-DD format.'),
  email: z
    .string({ required_error: 'Email is required to register a student.' })
    .email('Invalid email format. Please enter a valid email address.'),
  contactNo: z
    .string()
    .min(
      1,
      'Contact number is required. Please provide a valid contact number.',
    ),
  emergencyContactNo: z
    .string()
    .min(1, 'Emergency contact number is required. This is a mandatory field.'),
  presentAddress: z
    .string()
    .min(1, 'Present address is required. Please provide it.'),
  permanentAddress: z
    .string()
    .min(1, 'Permanent address is required. Please provide it.'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    message: 'Invalid blood group. Please select a valid blood group.',
  }),
  guardian: guardianSchemaValidation,
  localGuardian: guardianSchemaValidation,
  designation: z.string({
    required_error: 'Designation is required to register a student.',
  }),
  academicDepartment: z.string({
    required_error: 'Academic department is required to register a student.',
  }),
  admissionSemester: z.string({
    required_error:
      'Admission semester is required. Please specify the semester (e.g., Fall 2024).',
  }),
});

export { createStudentValidation };
