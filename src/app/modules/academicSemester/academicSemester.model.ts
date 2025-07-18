import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterName,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: academicSemesterMonth,
      required: true,
    },
    endMonth: {
      type: String,
      enum: academicSemesterMonth,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isExistSemester = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
    code: this.code,
  });

  if (isExistSemester) {
    throw new AppError(
      404,
      'Semester is already exist! Please recheck the semester name, year and code! And try again.',
    );
  }

  next();
});

const AcademicSemester = model<TAcademicSemester>(
  'academic_semester',
  academicSemesterSchema,
);

export default AcademicSemester;
