import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { jwt_access_secret } from '../configs';
import { TUserRoles } from '../modules/users/users.interface';

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
    const isValidToken = jwt.verify(token, jwt_access_secret);
    if (!isValidToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Your are unauthorized to access this resource!',
      );
    }

    // Check if the user has the required role
    if (
      roles?.length &&
      !roles.includes((isValidToken as jwt.JwtPayload).role)
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not allowed to access this resource!',
      );
    }

    // Attach the user to the request object
    req.user = isValidToken as jwt.JwtPayload;

    next();
  });
};

export default auth;
