import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { jwt_access_secret } from '../configs';
import { TUserRoles } from '../modules/users/users.interface';
import User from '../modules/users/users.model';

const auth = (...roles: TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Here you can implement your authentication logic

    // Get the token from the request headers
    const token = req.headers?.authorization;

    // Check if the token is present
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Your are unauthorized to access this resource!',
      );
    }

    // Check if the token is valid
    const isValidToken = jwt.verify(token, jwt_access_secret) as jwt.JwtPayload;

    if (!isValidToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Your are unauthorized to access this resource!',
      );
    }

    // Check if the user has the required role
    if (roles?.length && !roles.includes(isValidToken.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not allowed to access this resource!',
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

    // Attach the user to the request object
    req.user = isValidToken as jwt.JwtPayload;

    next();
  });
};

export default auth;
