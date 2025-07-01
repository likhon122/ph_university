import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeValidation = z
  .string({
    required_error: 'Start time is required',
  })
  .refine(
    startTime => {
      const timePatternRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // HH:MM format regex 00:00 - 23:59
      return timePatternRegex.test(startTime);
    },
    {
      message: 'Time must be in HH:mm format',
    },
  );

const createOfferedCourseValidation = z.object({
  body: z
    .object({
      semesterRegistration: z.string({
        required_error: 'Semester registration is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      course: z.string({
        required_error: 'Course is required',
      }),
      faculty: z.string({
        required_error: 'Faculty is required',
      }),
      section: z.number({
        required_error: 'Section is required',
      }),
      maxCapacity: z.number({
        required_error: 'Max capacity is required',
      }),
      startTime: timeValidation,
      endTime: timeValidation,
      day: z.array(z.enum([...(Days as [string, ...string[]])]), {
        required_error: 'Days are required',
      }),
    })
    .refine(
      data => {
        // Ensure start time is before end time

        const startTime = new Date(`1970-01-01T${data.startTime}:00`);
        const endTime = new Date(`1970-01-01T${data.endTime}:00`);

        return startTime < endTime;
      },
      {
        message: 'Start time must be before end time',
      },
    ),
});
const updateOfferedCourseValidation = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Offered course ID is required',
    }),
  }),
  body: z
    .object({
      faculty: z.string({
        required_error: 'Faculty is required',
      }),
      maxCapacity: z.number(),
      day: z.array(z.enum([...(Days as [string, ...string[]])])),
      startTime: timeValidation,
      endTime: timeValidation,
    })
    .refine(
      data => {
        // Ensure start time is before end time

        const startTime = new Date(`1970-01-01T${data.startTime}:00`);
        const endTime = new Date(`1970-01-01T${data.endTime}:00`);

        return startTime < endTime;
      },
      {
        message: 'Start time must be before end time',
      },
    ),
});

export { createOfferedCourseValidation, updateOfferedCourseValidation };
