import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academic_faculty',
      required: true,
    },
  },
  { timestamps: true },
);

const AcademicDepartment = model<TAcademicDepartment>(
  'academic_department',
  academicDepartmentSchema,
);

export default AcademicDepartment;
