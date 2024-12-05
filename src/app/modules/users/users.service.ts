import { defaultPassword } from '../../configs';
import { TCreateStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TCreateUser } from './users.interface';
import User from './users.model';

const createStudentService = async (
  createStudentData: TCreateStudent,
  password: string,
) => {
  const userData: Partial<TCreateUser> = {};

  if (password) {
    userData.password = password;
  } else {
    userData.password = defaultPassword;
  }

  // Set the role of the user
  userData.role = 'student';

  // make a custom id
  userData.id = Date.now().toString();

  // Create a new user
  const newUser = await User.create(userData);

  // Set the reference user id to the student data

  if (newUser) {
    createStudentData.user = newUser._id;
    createStudentData.role = 'student';
    createStudentData.id = userData.id;
  }

  // Create a user
  const newStudent = await Student.create(createStudentData);

  return { newUser, newStudent };
};

export { createStudentService };
