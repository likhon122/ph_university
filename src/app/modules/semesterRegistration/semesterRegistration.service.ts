/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { TSemesterRegistration } from './semesterRegistration.interface';
import SemesterRegistration from './semesterRegistration.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import OfferedCourse from '../offeredCourse/offeredCourse.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // Check if user provided directly add status ONGOING OR ENDED then send error
  if (payload.status === 'ONGOING' || payload.status === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cannot directly set status to ONGOING or ENDED. Please use the status UPCOMING and then update it later.',
    );
  }

  // Check if academicSemester is already exist in  UPCOMING or ONGOING
  const existingSemester = await SemesterRegistration.findOne({
    academicSemester,
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });

  if (existingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Semester registration for this academic semester already exists with status ${existingSemester.status}. Please update the existing registration instead of creating a new one.`,
    );
  }

  // check academic semester is valid
  const validAcademicSemester =
    await AcademicSemester.findById(academicSemester).lean();

  if (!validAcademicSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic semester not found or invalid please send a valid academicSemester ID',
    );
  }

  // Create new semester registration
  const newSemesterRegistration = await SemesterRegistration.create(payload);
  if (!newSemesterRegistration) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create semester registration! Please try again later.',
    );
  }

  // Add academic semester details to the new registration
  const result = {
    ...newSemesterRegistration.toObject(),
    academicSemester: validAcademicSemester,
  };

  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const semesterRegistration = await SemesterRegistration.findById(id)
    .populate('academicSemester')
    .lean();

  if (!semesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  return semesterRegistration;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterQuery = new QueryBuilder(SemesterRegistration.find(), query)
    .filter()
    .sort()
    .pagination()
    .selectFields();

  const result = await semesterQuery.modelQuery.populate('academicSemester');

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const { status: payloadStatus } = payload;

  // Check the semester registration is exist or not
  const existingSemesterRegistration =
    await SemesterRegistration.findById(id).populate('academicSemester');

  if (!existingSemesterRegistration) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found. Please provide a valid ID.',
    );
  }

  const { status: existingStatus } = existingSemesterRegistration;

  // Check if user directly does not provided status UPCOMING -> ENDED or ONGOING -> UPCOMING or cannot change status when it is ENDED
  if (existingStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cannot update anything in an ENDED semester registration. Please create a new one.',
    );
  }

  if (payloadStatus) {
    if (existingStatus === payloadStatus) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You cannot update the status to the same value ${payloadStatus}. Please provide a different status.`,
      );
    } else if (existingStatus === 'ONGOING' && payloadStatus === 'UPCOMING') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You cannot change the status of an ONGOING semester registration to UPCOMING. Please create a new one.',
      );
    } else if (existingStatus === 'UPCOMING' && payloadStatus === 'ENDED') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You cannot change the status directly from UPCOMING to ENDED semester registration. Please update the status to ONGOING first, then to ENDED.',
      );
    }
  }

  // Now we can update the semester registration
  const updatedSemesterRegistration =
    await SemesterRegistration.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

  if (!updatedSemesterRegistration) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update semester registration. Please try again later.',
    );
  }

  return updatedSemesterRegistration;
};

const deleteSemesterRegistrationIntoDB = async (id: string) => {
  if (!id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester registration ID is required to delete. Please provide id in params!',
    );
  }

  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // Check if the semester registration exists
  const semesterRegistrationData = await SemesterRegistration.findById(id)
    .populate('academicSemester', 'status')
    .lean();

  if (!semesterRegistrationData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found! Please check the semester registration ID.',
    );
  }

  // Check if the semester registration is just for UPCOMING semester
  if (semesterRegistrationData.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You do not delete any semester registration for ${semesterRegistrationData.status} semester registration. You can only delete semester registrations for UPCOMING semester registration.`,
    );
  }

  // Now delete the offered courses associated with this semester registration
  // Make session for transaction
  const session = await SemesterRegistration.startSession();

  try {
    session.startTransaction();

    // Delete all offered courses associated with this semester registration
    const deleteOfferedCourses = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );

    if (!deleteOfferedCourses) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Failed to delete associated offered courses. Please try again later.',
      );
    }

    // Now delete the semester registration
    const deletedSemesterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
      });

    if (!deletedSemesterRegistration) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Failed to delete semester registration. Please try again later.',
      );
    }

    // Commit the transaction and end the session
    await session.commitTransaction();
    session.endSession();

    return null;
  } catch (error: any) {
    // If any error occurs, abort the transaction and end the session
    await session.abortTransaction();
    session.endSession();
    throw new Error(
      error.message ||
        'Failed to delete semester registration! Please try again later.',
    );
  }
};

export {
  createSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationFromDB,
  getAllSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationIntoDB,
};
