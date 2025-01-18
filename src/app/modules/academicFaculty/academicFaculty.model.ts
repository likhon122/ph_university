import { Schema, model } from 'mongoose';

import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const AcademicFaculty = model<TAcademicFaculty>(
  'academic_faculty',
  academicFacultySchema,
);

export default AcademicFaculty;
