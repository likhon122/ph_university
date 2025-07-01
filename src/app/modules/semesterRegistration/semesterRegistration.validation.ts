import { z } from 'zod';
import { semesterRegistrationStatusArr } from './semesterRegistration.constant';

const createSemesterRegistrationValidation = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'Academic semester is required',
    }),
    status: z.enum(
      [...(semesterRegistrationStatusArr as [string, ...string[]])],
      {
        required_error: 'Status is required',
      },
    ),
    startDate: z
      .string({
        required_error: 'Start date is required',
      })
      .datetime({
        message: 'Start date must be a valid date',
      }),
    endDate: z
      .string({
        required_error: 'End date is required',
      })
      .datetime({
        message: 'End date must be a valid date',
      }),
    minCredit: z.number({
      required_error: 'Minimum credit is required',
    }),
    maxCredit: z.number({
      required_error: 'Maximum credit is required',
    }),
  }),
});

const updateSemesterRegistrationValidation = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Semester registration ID is required',
    }),
  }),
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(semesterRegistrationStatusArr as [string, ...string[]])], {
        required_error: 'Status is required',
      })
      .optional(),
    startDate: z
      .string()
      .datetime({ message: 'Start date must be a valid date' })
      .optional(),
    endDate: z
      .string()
      .datetime({ message: 'End date must be a valid date' })
      .optional(),
    minCredit: z
      .number({
        required_error: 'Minimum credit is required',
      })
      .optional(),
    maxCredit: z
      .number({
        required_error: 'Maximum credit is required',
      })
      .optional(),
  }),
});

export {
  createSemesterRegistrationValidation,
  updateSemesterRegistrationValidation,
};
