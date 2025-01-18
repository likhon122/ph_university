import mongoose from 'mongoose';
import httpStatus from 'http-status';

import QueryBuilder from '../../builder/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import Faculty from './faculty.model';
import AppError from '../../errors/AppError';
import User from '../users/users.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  // Find all faculties with academicDepartment populated and apply query
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate([
      {
        path: 'academicDepartment',
      },
      {
        path: 'user',
        select: '-password',
      },
    ]),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .pagination()
    .selectFields();

  // Execute the query
  const result = await facultyQuery.modelQuery;
  // Return the result
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate([
    {
      path: 'academicDepartment',
    },
    {
      path: 'user',
      select: '-password',
    },
  ]);

  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  // Extract the non primitive field name from the payload
  const { name, ...remainingFacultyData } = payload;

  // Create a new object with the primitive field name
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  // If name is present in the payload, then update the name fields
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // Update the faculty data
  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  // Return the updated faculty data
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  // Start a session
  const session = await mongoose.startSession();

  try {
    // Start transaction
    session.startTransaction();

    // Find faculty and update isDeleted to true
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    // if faculty is not found
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }

    // get user _id from deletedFaculty
    const userId = deletedFaculty.user;

    // Find user and update isDeleted to true
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    // if user is not found
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    // Commit and end the session
    await session.commitTransaction();
    await session.endSession();

    // return the deleted faculty
    return deletedFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
