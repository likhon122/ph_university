import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import Faculty from '../faculty/faculty.model';
import SemesterRegistration from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.type';
import OfferedCourse from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const getSingleOfferedCourseFromDB = async (id: string) => {
  if (!id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Offered course ID is required to retrieve. Please provide id in params!',
    );
  }
  // Check if the offered course exists
  const offeredCourseData = await OfferedCourse.findById(id).populate(
    'semesterRegistration',
  );

  if (!offeredCourseData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Offered course not found! Please check the offered course ID.',
    );
  }

  return offeredCourseData;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  // Call query builder to get all offered courses
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .pagination()
    .selectFields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    // maxCapacity,
    day,
    startTime,
    endTime,
  } = payload;

  const [
    semesterRegistrationData,
    academicFacultyData,
    academicDepartmentData,
    courseData,
    facultyData,
  ] = await Promise.all([
    SemesterRegistration.findById(semesterRegistration).select(
      'academicSemester',
    ),
    AcademicFaculty.findById(academicFaculty).select('name'),
    AcademicDepartment.findById(academicDepartment)
      .populate('academicFaculty', '_id')
      .select('name academicFaculty'),
    Course.findById(course).select('_id'),
    Faculty.findById(faculty).select('name'),
  ]);

  // Check if all required data exists
  if (!semesterRegistrationData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found! Please check the semester registration ID.',
    );
  } else if (!academicFacultyData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic faculty not found! Please check the academic faculty ID.',
    );
  } else if (!academicDepartmentData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic department not found! Please check the academic department ID.',
    );
  } else if (!courseData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Course not found! Please check the course ID.',
    );
  } else if (!facultyData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Faculty not found! Please check the faculty ID.',
    );
  }

  // Check if the academic department belongs to the academic faculty
  if (
    academicDepartmentData.academicFaculty._id.toString() !==
    academicFaculty.toString()
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${academicDepartmentData.name} department does not belong to the ${academicFacultyData.name} faculty.`,
    );
  }

  // Check if the course section is already offered in the same registration semester
  const existingOfferedCourse = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });

  if (existingOfferedCourse) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This course section is already offered in the specified semester registration.',
    );
  }

  // Check the time conflict for the offered course. Faculty can only offer one course at a time.
  const timeConflictWithFaculty = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    day: { $in: day },
  }).select('startTime endTime');

  const timeConflict = hasTimeConflict(
    timeConflictWithFaculty,
    startTime,
    endTime,
  );

  if (timeConflict) {
    const { firstName, middleName, lastName } = facultyData.name;
    const facultyName = firstName + ' ' + (middleName || '') + ' ' + lastName;
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Time conflict with faculty ${facultyName}. This faculty is already take a class at the same time and day. Please choose a different time slot.`,
    );
  }

  const createdOfferedCourse = await OfferedCourse.create({
    ...payload,
    academicSemester: semesterRegistrationData.academicSemester,
  });

  return createdOfferedCourse;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'day' | 'startTime' | 'endTime'>,
) => {
  const { faculty, day, startTime, endTime } = payload;

  const offeredCourseData = await OfferedCourse.findById(id).populate(
    'semesterRegistration',
    'status',
  );

  if (!offeredCourseData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Offered course not found! Please check the offered course ID.',
    );
  }

  // Check if the offered is just for UPCOMING semester
  const semesterReg = offeredCourseData.semesterRegistration as unknown as {
    status: string;
  };
  if (semesterReg.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You do not update any offered course for ${semesterReg.status} semester registration. You can only update offered courses for UPCOMING semester registration.`,
    );
  }

  // Check if the faculty exists
  const facultyData = await Faculty.findById(faculty).select('name');
  if (!facultyData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Faculty not found! Please check the faculty ID.',
    );
  }

  // Check the time conflict for the offered course. Faculty can only offer one course at a time.
  const timeConflictWithFaculty = await OfferedCourse.find({
    semesterRegistration: offeredCourseData.semesterRegistration,
    faculty,
    day: { $in: day },
  }).select('startTime endTime');

  const timeConflict = hasTimeConflict(
    timeConflictWithFaculty,
    startTime,
    endTime,
  );

  if (timeConflict) {
    const { firstName, middleName, lastName } = facultyData.name;
    const facultyName = firstName + ' ' + (middleName || '') + ' ' + lastName;
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Time conflict with faculty ${facultyName}. This faculty is already take a class at the same time and day. Please choose a different time slot.`,
    );
  }

  const updatedOfferedCourse = await OfferedCourse.findByIdAndUpdate(
    id,
    { faculty, day, startTime, endTime },
    { new: true },
  );

  if (!updatedOfferedCourse) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Offered course not found! Please check the offered course ID.',
    );
  }

  return updatedOfferedCourse;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  if (!id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Offered course ID is required to delete. Please provide id in params!',
    );
  }

  // Check if the offered course exists
  const offeredCourseData = await OfferedCourse.findById(id).populate(
    'semesterRegistration',
    'status',
  );
  if (!offeredCourseData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Offered course not found! Please check the offered course ID.',
    );
  }

  // Check if the offered course is just for UPCOMING semester
  const semesterReg = offeredCourseData.semesterRegistration as unknown as {
    status: string;
  };

  if (semesterReg.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You do not delete any offered course for ${semesterReg.status} semester registration. You can only delete offered courses for UPCOMING semester registration.`,
    );
  }

  const deletedOfferedCourse = await OfferedCourse.findByIdAndDelete(id);

  if (!deletedOfferedCourse) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Offered course not found! Please check the offered course ID.',
    );
  }

  return null;
};

export {
  getSingleOfferedCourseFromDB,
  getAllOfferedCourseFromDB,
  createOfferedCourseIntoDB,
  updateSemesterRegistrationIntoDB,
  deleteOfferedCourseFromDB,
};
