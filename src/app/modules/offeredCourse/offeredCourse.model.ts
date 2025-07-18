import mongoose from 'mongoose';
import { TOfferedCourse } from './offeredCourse.type';
import { Days } from './offeredCourse.constant';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'semester_registration',
      required: true,
    },
    academicSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'academic_semester',
      required: true,
    },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'academic_faculty',
      required: true,
    },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'academic_department',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course',
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'faculty',
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    day: {
      type: [String],
      enum: Days,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const OfferedCourse = mongoose.model<TOfferedCourse>(
  'offered_course',
  offeredCourseSchema,
);

export default OfferedCourse;
