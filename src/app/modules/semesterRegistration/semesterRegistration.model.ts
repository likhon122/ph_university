import mongoose from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { semesterRegistrationStatusArr } from './semesterRegistration.constant';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'academic_semester',
      required: true,
    },
    status: {
      type: String,
      enum: semesterRegistrationStatusArr,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
    },
    maxCredit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SemesterRegistration = mongoose.model<TSemesterRegistration>(
  'semester_registration',
  semesterRegistrationSchema,
);

export default SemesterRegistration;
