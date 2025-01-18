import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Faculty Name is required',
    }),
  }),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Faculty Name is required',
    }),
  }),
});

const getSingleAcademicFacultyValidationSchema = z.object({
  params: z.object({
    facultyId: z
      .string({
        required_error:
          'Academic faculty id is required! Please provide facultyId!',
      })
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: 'Academic faculty id must be a valid id!',
      }),
  }),
});

export {
  createAcademicFacultyValidationSchema,
  getSingleAcademicFacultyValidationSchema,
  updateFacultyValidationSchema,
};
