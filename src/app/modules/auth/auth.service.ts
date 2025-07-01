import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import AppError from '../../errors/AppError';
import User from '../users/users.model';
import { TLoginUser } from './auth.interface';
import isPasswordMatched from '../../utils/isPasswordMatched';
import { jwt_access_secret } from '../../configs';

const loginUserHandler = async (payload: TLoginUser) => {
  const { id, password } = payload;

  // Check if the user exists in the database
  const user = await User.isUserExistByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with this ID');
  }

  // Check if the password is correct
  if (!(await isPasswordMatched(password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // Check If the user is deleted or blocked
  if (user.isDeleted) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User is already deleted! Please contact the customer support.',
    );
  } else if (user.status === 'blocked') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User is blocked! Please contact the customer support.',
    );
  }

  // If the user is found and the password matches then return refresh and access tokens
  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    jwt_access_secret,
    {
      expiresIn: '10d',
    },
  );

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePasswordHandler = async (
  payload: {
    oldPassword: string;
    newPassword: string;
  },
  userId: string,
) => {
  // Check if the user exists in the database
  const user = await User.isUserExistByCustomId(userId);
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found! Please try again.',
    );
  }

  // Check if the password is correct
  const isPasswordMatchedResult = await isPasswordMatched(
    payload.oldPassword,
    user.password,
  );

  if (!isPasswordMatchedResult) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Password is incorrect! Please check the password and try again.',
    );
  }

  // Update the password
  const updatedUser = await User.findOneAndUpdate(
    {
      id: user.id,
    },
    {
      password: payload.newPassword,
      needsPasswordChange: false,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update password! Please try again.',
    );
  }

  return updatedUser;
};

export { loginUserHandler, changePasswordHandler };
