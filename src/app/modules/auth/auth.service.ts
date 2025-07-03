import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import AppError from '../../errors/AppError';
import User from '../users/users.model';
import { TLoginUser } from './auth.interface';
import isPasswordMatched from '../../utils/isPasswordMatched';
import {
  jwt_access_expires_in,
  jwt_access_secret,
  jwt_refresh_expires_in,
  jwt_refresh_secret,
} from '../../configs';
import createJwtToken from '../../utils/createJwtToken';

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
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    jwt_access_secret,
    jwt_access_expires_in,
  );

  const refreshToken = createJwtToken(
    jwtPayload,
    jwt_refresh_secret,
    jwt_refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePasswordHandler = async (
  payload: {
    oldPassword: string;
    newPassword: string;
  },
  userId: string,
  ipAddress: string | string[] | undefined,
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

  // Hash the new password
  const hashedNewPassword = await User.hashPassword(payload.newPassword);

  // Update the password
  const updatedUser = await User.findOneAndUpdate(
    {
      id: user.id,
    },
    {
      password: hashedNewPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
      passwordChangeIp: ipAddress,
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

const refreshTokenHandler = async (refreshToken: string) => {
  // Check if the token is present
  if (!refreshToken) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Your are unauthorized to access this resource!',
    );
  }

  // Check if the token is valid
  const isValidToken = jwt.verify(
    refreshToken,
    jwt_refresh_secret,
  ) as jwt.JwtPayload;

  if (!isValidToken) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Your are unauthorized to access this resource!',
    );
  }

  // Check if the user exists in the database
  const user = await User.isUserExistByCustomId(isValidToken.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with this ID');
  }

  // Check If the user is deleted or blocked
  if (user.isDeleted) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `This ${user.role} is already deleted! Please contact the customer support.`,
    );
  } else if (user.status === 'blocked') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `This ${user.role} is blocked! Please contact the customer support.`,
    );
  }

  // Now check if the user change password then we will check The jwt token time is less than the password change time
  if (!user.needsPasswordChange && user.passwordChangeAt) {
    const isJwtIssuedBeforePassChange = User.isJwtIssuedBeforePasswordChange(
      user.passwordChangeAt,
      isValidToken.iat as number,
    );

    if (isJwtIssuedBeforePassChange) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You changed your password recently, please login again to continue.',
      );
    }
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    jwt_access_secret,
    jwt_access_expires_in,
  );

  return { accessToken };
};

export { loginUserHandler, changePasswordHandler, refreshTokenHandler };
