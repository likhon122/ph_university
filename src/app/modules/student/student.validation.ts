import { z } from 'zod';

// Student Name Validation
export const studentNameValidationSchema = z.object({
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
export const guardianSchemaValidationSchema = z.object({
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
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(
        4,
        'Password length at least minimum 4 characters long! Please select more than 3 characters long password',
      )
      .max(
        20,
        'Password length maximum 21 long! Please select less than 20 characters long password',
      )
      .optional(),
    student: z.object({
      name: studentNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        message: 'Invalid gender. Please choose either "male" or "female".',
        required_error: 'Gender is required to register a student.',
      }),
      dateOfBirth: z
        .string()
        .min(
          1,
          'Date of birth is required. Please enter it in YYYY-MM-DD format.',
        ),
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
        .min(
          1,
          'Emergency contact number is required. This is a mandatory field.',
        ),
      presentAddress: z
        .string()
        .min(1, 'Present address is required. Please provide it.'),
      permanentAddress: z
        .string()
        .min(1, 'Permanent address is required. Please provide it.'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        message: 'Invalid blood group. Please select a valid blood group.',
      }),
      guardian: guardianSchemaValidationSchema,
      localGuardian: guardianSchemaValidationSchema,
      designation: z.string({
        required_error: 'Designation is required to register a student.',
      }),
      admissionSemester: z.string(),
      // academicDepartment: z.string({
      //   required_error:
      //     'Academic department is required to register a student.',
      // }),
    }),
  }),
});

const updateStudentNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// Guardian Update Validation (All fields optional)
const updateGuardianSchemaValidationSchema = z.object({
  name: updateStudentNameValidationSchema.optional(),
  email: z.string().email('Invalid email format.').optional(),
  contactNo: z.string().optional(),
  relation: z.string().optional(),
  address: z
    .object({
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
    })
    .optional(),
});

// Update Student Validation (All fields optional)
const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(4).max(20).optional(),
    student: z
      .object({
        name: updateStudentNameValidationSchema.optional(),
        gender: z.enum(['male', 'female']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email('Invalid email format.').optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        guardian: updateGuardianSchemaValidationSchema.optional(),
        localGuardian: updateGuardianSchemaValidationSchema.optional(),
        designation: z.string().optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
      })
      .optional(),
  }),
});

export { createStudentValidationSchema, updateStudentValidationSchema };
