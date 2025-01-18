import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterName,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]], {
      required_error: 'Academic semester name is required',
      invalid_type_error: 'Academic semester name must be Autumn/Summer/Fall',
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'Academic semester code is required',
      invalid_type_error: 'Academic semester code must be 01 / 02 / 03',
    }),
    year: z
      .string({
        required_error: 'Academic semester year is required',
        invalid_type_error: 'Academic semester year must be a valid year',
      })
      .min(4, {
        message: 'Academic semester year must be a valid year',
      }),
    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'Academic semester startMonth is required',
      invalid_type_error:
        'Academic semester start month must be a valid english month name',
    }),
    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'Academic semester endMonth is required',
      invalid_type_error:
        'Academic semester end month must be a valid english month name',
    }),
  }),
});

const getSingleAcademicSemesterValidationSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'Academic semester id is required! Please provide id!',
      })
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: 'Academic semester id must be a valid id!',
      }),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error:
          'Academic semester id is required to update! Please provide id!',
      })
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: 'Academic semester id must be a valid id!',
      }),
  }),
  body: z.object({
    name: z
      .enum([...academicSemesterName] as [string, ...string[]], {
        required_error: 'Academic semester name is required',
        invalid_type_error: 'Academic semester name must be Autumn/Summer/Fall',
      })
      .optional(),
    code: z
      .enum([...academicSemesterCode] as [string, ...string[]], {
        required_error: 'Academic semester code is required',
        invalid_type_error: 'Academic semester code must be 01 / 02 / 03',
      })
      .optional(),
    year: z
      .string({
        required_error: 'Academic semester year is required',
        invalid_type_error: 'Academic semester year must be a valid year',
      })
      .min(4, {
        message: 'Academic semester year must be a valid year',
      })
      .optional(),
    startMonth: z
      .enum([...academicSemesterMonth] as [string, ...string[]], {
        required_error: 'Academic semester startMonth is required',
        invalid_type_error:
          'Academic semester start month must be a valid english month name',
      })
      .optional(),
    endMonth: z
      .enum([...academicSemesterMonth] as [string, ...string[]], {
        required_error: 'Academic semester endMonth is required',
        invalid_type_error:
          'Academic semester end month must be a valid english month name',
      })
      .optional(),
  }),
});

export {
  createAcademicSemesterValidationSchema,
  getSingleAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
