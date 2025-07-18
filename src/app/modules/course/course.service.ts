import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import QueryBuilder from '../../builder/QueryBuilder';
import mongoose from 'mongoose';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Course is not created. Please try again',
    );
  }

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Course not found. Please try valid course id',
    );
  }

  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['title', 'prefix', 'code', 'credits'];

  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(searchAbleFields)
    .filter()
    .sort()
    .pagination()
    .selectFields();

  const result = await courseQuery.modelQuery;

  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  if (!remainingCourseData && !preRequisiteCourses) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide valid data to update course',
    );
  }

  // Start a session
  const session = await mongoose.startSession();

  try {
    // Start a transaction
    session.startTransaction();

    if (remainingCourseData) {
      const result = await Course.findByIdAndUpdate(id, remainingCourseData, {
        new: true,
        runValidators: true,
        session,
      });

      if (!result) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Course is not updated. Please try again',
        );
      }
    }

    if (preRequisiteCourses?.length) {
      // At first filter out delete preRequisiteCourses from payload
      const deletePreRequisiteCourses = preRequisiteCourses
        .filter(preRequisite => preRequisite.isDeleted)
        .map(preRequisite => preRequisite.course);

      // If deletePreRequisiteCourses is not empty then delete those preRequisiteCourses
      if (deletePreRequisiteCourses.length) {
        const deletePreRequisites = await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: {
                course: {
                  $in: deletePreRequisiteCourses,
                },
              },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        );

        if (!deletePreRequisites) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            'Course is not updated. Delete preRequisiteCourses failed. Please try again',
          );
        }
      }

      // At first filter out new preRequisiteCourses from payload
      const newPreRequisiteCourses = preRequisiteCourses.filter(
        preRequisite => preRequisite.course && !preRequisite.isDeleted,
      );

      // If newPreRequisiteCourses is not empty then add those preRequisiteCourses
      if (newPreRequisiteCourses.length) {
        const addPreRequisites = await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              preRequisiteCourses: {
                $each: newPreRequisiteCourses,
              },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        );

        if (!addPreRequisites) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            'Course is not updated. Add preRequisiteCourses failed. Please try again',
          );
        }
      }

      // Commit the transaction
      await session.commitTransaction();
      await session.endSession();

      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );

      return result;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Course is not deleted. Please provide valid course id and try again',
    );
  }

  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  if (!Array.isArray(payload)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Payload must be an array of faculty IDs',
    );
  }
  const result = await CourseFaculty.findOneAndUpdate(
    { course: courseId },
    {
      course: courseId,
      $addToSet: {
        faculties: { $each: payload },
      },
    },
    { upsert: true, new: true },
  ).populate('faculties');

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Faculties are not assigned with course. Please try again',
    );
  }

  return result;
};

const removeFacultiesFromCourseIntoDB = async (
  courseId: string,
  payload: string[],
) => {
  const result = await CourseFaculty.findOneAndUpdate(
    { course: courseId },
    {
      $pull: {
        faculties: { $in: payload },
      },
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Faculties are not removed from course. Please try again',
    );
  }

  return result;
};

export {
  createCourseIntoDB,
  getSingleCourseFromDB,
  getAllCoursesFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseIntoDB,
};
