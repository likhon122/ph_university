import mongoose from 'mongoose';
import httpStatus from 'http-status';

import { defaultPassword } from '../../configs';
import AppError from '../../errors/AppError';
import generateStudentId from '../../utils/generateStudentId';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TCreateStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TCreateUser } from './users.interface';
import User from './users.model';
import { TFaculty } from '../faculty/faculty.interface';
import generateFacultyId from '../../utils/generateFacultyId';
import Faculty from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import generateAdminId from '../../utils/generateAdminId';
import { Admin } from '../admin/admin.model';
import { JwtPayload } from 'jsonwebtoken';
import uploadImage from '../../utils/uploadImage';

const createStudentService = async (
  payload: TCreateStudent,
  password: string,
  file?: Express.Multer.File,
) => {
  const userData: Partial<TCreateUser> = {};

  if (password) {
    userData.password = password;
  } else {
    userData.password = defaultPassword;
  }

  // Set the role of the user
  userData.role = 'student';
  userData.email = payload.email;

  // make a custom id
  const [academicDepartmentExist, academicSemesterInfo] = await Promise.all([
    AcademicDepartment.findById(payload.academicDepartment),
    AcademicSemester.findById(payload.admissionSemester),
  ]);

  if (!academicSemesterInfo) {
    throw new AppError(404, "Academic Semester doesn't exist with this ID");
  }

  if (!academicDepartmentExist) {
    throw new AppError(404, "Academic Department doesn't exist with this ID");
  }

  let profileImageUrl: string = '';
  // Upload the profile image if it exists
  if (file) {
    profileImageUrl = await uploadImage(file, payload.name.firstName);
  }

  // Make a session of Transaction
  const session = await mongoose.startSession();

  try {
    // Start the transaction
    session.startTransaction();

    // Generate a student id
    userData.id = await generateStudentId(academicSemesterInfo);

    // Create a new user transaction(1)
    const [newUser] = await User.create([userData], { session });

    // if newUser is not created then throw an error
    if (!newUser) {
      throw new AppError(
        400,
        'User not created. Please provide correct information!',
      );
    }
    // Set the reference user id to the student data
    if (newUser) {
      payload.user = newUser._id;
      payload.role = 'student';
      payload.id = userData.id;
    }

    payload.profileImage = profileImageUrl.length ? profileImageUrl : null;

    // Create a student transaction(2)
    const [student] = await Student.create([payload], { session });

    // Populate the student data
    const newStudent = await student.populate([
      {
        path: 'academicDepartment',
      },
      {
        path: 'academicDepartment',
        populate: 'academicFaculty',
      },
      {
        path: 'admissionSemester',
      },
    ]);

    // if newStudent is not created then throw an error
    if (!newStudent) {
      throw new AppError(
        400,
        'Student not created. Please provide correct information!',
      );
    }

    // Transaction is successful and commit the transaction
    await session.commitTransaction();

    // return the new user and new student data
    return { newUser, newStudent };
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const createFacultyIntoDB = async (
  password: string,
  payload: TFaculty,
  file?: Express.Multer.File,
) => {
  const userData: Partial<TCreateUser> = {};

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(404, "Academic Department doesn't exist with this ID");
  }

  if (password) {
    userData.password = password;
  } else {
    userData.password = defaultPassword;
  }

  if (payload.role && payload.role !== 'Faculty') {
    throw new AppError(400, 'To create a Faculty, role must be Faculty');
  }

  userData.role = 'faculty';
  userData.email = payload.email;

  // make a custom id
  const facultyId = await generateFacultyId();

  // assign the id to the user data
  userData.id = facultyId;

  // Upload the profile image if it exists
  let profileImageUrl: string = '';
  if (file) {
    profileImageUrl = await uploadImage(file, payload.name.firstName);
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const [newUser] = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(
        400,
        'User not created. Please provide correct information!',
      );
    }

    if (newUser) {
      payload.user = newUser._id;
      payload.id = facultyId;
      payload.role = 'Faculty';
    }

    if (newUser) {
      payload.user = newUser._id;
    }

    payload.profileImage = profileImageUrl.length ? profileImageUrl : null;

    const [newFacultyWithoutPopulate] = await Faculty.create([payload], {
      session,
    });

    const newFaculty = await newFacultyWithoutPopulate.populate([
      {
        path: 'academicDepartment',
      },
      {
        path: 'academicDepartment',
        populate: 'academicFaculty',
      },
    ]);

    if (!newFaculty) {
      throw new AppError(
        400,
        'Faculty not created. Please provide correct information!',
      );
    }

    // Transaction is successful and commit the transaction
    await session.commitTransaction();

    // return the new user and new faculty data
    return { newUser, newFaculty };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const createAdminIntoDB = async (
  password: string,
  payload: TAdmin,
  file?: Express.Multer.File,
) => {
  const userData: Partial<TCreateUser> = {};

  if (password) {
    userData.password = password;
  } else {
    userData.password = defaultPassword;
  }

  if (payload.role && payload.role !== 'admin') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'To create a Admin, role must be Admin',
    );
  }

  // Generate a custom id A-lastId+1
  const adminId = await generateAdminId();

  userData.role = 'admin';
  userData.email = payload.email;
  userData.id = adminId;

  // Upload the profile image if it exists
  let profileImageUrl: string = '';
  if (file) {
    profileImageUrl = await uploadImage(file, payload.name.firstName);
  }

  // create a session
  const session = await mongoose.startSession();

  try {
    // start the transaction
    session.startTransaction();

    const [newUser] = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'User not created. Please provide correct information!',
      );
    }

    if (newUser) {
      payload.user = newUser._id;
      payload.id = adminId;
      payload.role = 'admin';
    }

    payload.profileImage = profileImageUrl.length ? profileImageUrl : null;

    console.log('creating admin with payload', payload);

    const [newAdmin] = await Admin.create([payload], {
      session,
    });

    if (!newAdmin) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Admin not created. Please provide correct information!',
      );
    }

    // Transaction is successful and commit the transaction
    await session.commitTransaction();

    return { newUser, newAdmin };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getMeFromDB = async (payload: JwtPayload) => {
  const { userId, role } = payload;

  let user = null;

  if (role === 'student') {
    user = await Student.findOne({ id: userId }).populate(
      'user academicDepartment admissionSemester',
    );
  } else if (role === 'faculty') {
    user = await Faculty.findOne({ id: userId }).populate(
      'user academicDepartment',
    );
  } else if (role === 'admin') {
    user = await Admin.findOne({ id: userId }).populate('user');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

const updateStatusIntoDB = async (
  userId: string,
  status: 'in-progress' | 'blocked',
) => {
  if (!userId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User id is required to update status',
    );
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user ID format');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with this ID');
  }

  console.log(user);

  user.status = status;
  await user.save();

  return user;
};

export {
  createStudentService,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  updateStatusIntoDB,
};
