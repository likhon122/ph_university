import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic Faculty is required',
      })
      .optional(),
  }),
});

const getSingleAcademicDepartmentValidationSchema = z.object({
  params: z.object({
    departmentId: z
      .string({
        required_error:
          'Academic Department id is required! Please provide DepartmentId!',
      })
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: 'Academic Department id must be a valid id!',
      }),
  }),
});

export {
  createAcademicDepartmentValidationSchema,
  getSingleAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
