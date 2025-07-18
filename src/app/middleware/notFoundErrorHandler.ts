/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import AppError from '../errors/AppError';

const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  throw new AppError(
    404,
    'Page Not Found Please Check URL. You lost your track!',
  );
};

export default notFoundErrorHandler;
