import Student from './student.model';
import mongoose from 'mongoose';
import User from '../users/users.model';
import AppError from '../../errors/AppError';
import { TCreateStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllUserService = async (query: Record<string, unknown>) => {
  // const queryObject = { ...query };

  // let searchTerm = '';
  // let sort = '-createdAt';
  // let limit = 10;
  // let page = 1;
  // let fields = '-__v';

  const searchFields = [
    'email',
    'name.firstName',
    'name.middleName',
    'name.lastName',
    'presentAddress',
    'contactNo',
    'designation',
  ];

  // // Exclude some fields from queryObject to filter out
  // const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];

  // excludeFields.forEach(field => delete queryObject[field]);

  // // Search query for searchFields the fields
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: searchFields.map((field: string) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // Filter query for queryObject the fields
  // const filterQuery = searchQuery.find(queryObject).populate([
  //   {
  //     path: 'user',
  //     select: '-password',
  //   },
  //   {
  //     path: 'admissionSemester',
  //   },
  //   {
  //     path: 'academicDepartment',
  //     populate: 'academicFaculty',
  //   },
  // ]);

  // // Sort the query
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // // Pagination and limit
  // if (query.page) {
  //   page = query.page as number;
  // }

  // if (query.limit) {
  //   limit = query.limit as number;
  // }

  // const skip = (page - 1) * limit;

  // const paginationAndLimitQuery = sortQuery.skip(skip).limit(limit);

  // // Field Limiting and select fields users want to see
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const students = await paginationAndLimitQuery.select(fields);

  // Call the QueryBuilder class to build the query

  const student = new QueryBuilder(
    Student.find().populate([
      {
        path: 'user',
        select: '-password',
      },
      {
        path: 'admissionSemester',
      },
      {
        path: 'academicDepartment',
        populate: 'academicFaculty',
      },
    ]),
    query,
  )
    .search(searchFields)
    .filter()
    .sort()
    .pagination()
    .selectFields();

  const students = await student.modelQuery.find();

  // If no student found then throw an error
  if (!students) {
    throw new AppError(
      404,
      'No student found! Please add some student! Or something went wrong!',
    );
  }

  return students;
};

const getSingleStudentService = async (studentId: string) => {
  const student = await Student.findOne({ id: studentId });

  if (!student) {
    throw (
      (new AppError(404, 'Student not found please provide correct studentId'),
      {})
    );
  }

  if (student.isDeleted) {
    throw new AppError(
      401,
      'You are deleted your account. Please recover that! Or please contact us!',
    );
  }

  return student;
};

const deleteStudentService = async (studentId: string) => {
  // make a session to delete the student

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      {
        isDeleted: true,
      },
      { session, new: true },
    );

    if (!deletedStudent) {
      throw new AppError(404, 'Student not found! Please check the student ID');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { session, new: true },
    ).select('-password');

    if (!deletedUser) {
      throw new AppError(404, 'User not found! Please check the user ID');
    }
    await session.commitTransaction();

    return { deletedStudent, deletedUser };
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateStudentService = async (
  studentId: string,
  payload: Partial<TCreateStudent>,
) => {
  const { name, guardian, localGuardian, ...restAllPrimitiveData } = payload;

  // If payload data is primitive then its change directly but if it is object then we need to change it to dot notation

  // Declare a new object to store all the data
  const modifiedStudent: Record<string, unknown> = { ...restAllPrimitiveData };

  // Name non primitive object
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudent[`name.${key}`] = value;
    }
  }

  // Guardian non primitive object
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      // Name nested object
      if (key === 'name' && value && Object.keys(value).length) {
        for (const [nestedKey, nestedValue] of Object.entries(value) as [
          string,
          unknown,
        ][]) {
          modifiedStudent[`guardian.name.${nestedKey}`] = nestedValue;
        }
        // Address nested object
      } else if (key === 'address' && value && Object.keys(value).length) {
        for (const [nestedKey, nestedValue] of Object.entries(value) as [
          string,
          unknown,
        ][]) {
          modifiedStudent[`guardian.address.${nestedKey}`] = nestedValue;
        }
      } else {
        // Rest of the fields
        modifiedStudent[`guardian.${key}`] = value;
      }
    }
  }

  // Local Guardian non primitive object
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      // Name nested object
      if (key === 'name' && value && Object.keys(value).length) {
        for (const [nestedKey, nestedValue] of Object.entries(value) as [
          string,
          unknown,
        ][]) {
          modifiedStudent[`localGuardian.name.${nestedKey}`] = nestedValue;
        }
      }
      // Address nested object
      else if (key === 'address' && value && Object.keys(value).length) {
        for (const [nestedKey, nestedValue] of Object.entries(value) as [
          string,
          unknown,
        ][]) {
          modifiedStudent[`localGuardian.address.${nestedKey}`] = nestedValue;
        }
      } else {
        // Rest of the fields
        modifiedStudent[`localGuardian.${key}`] = value;
      }
    }
  }

  const updatedStudent = await Student.findOneAndUpdate(
    { id: studentId },
    modifiedStudent,
    { new: true, runValidators: true },
  );

  if (!updatedStudent) {
    throw new AppError(404, 'Student not found! Please check the student ID');
  }

  return updatedStudent;
};

export {
  getAllUserService,
  deleteStudentService,
  getSingleStudentService,
  updateStudentService,
};
