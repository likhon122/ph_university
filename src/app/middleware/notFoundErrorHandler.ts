/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import { errorResponse } from '../utils/response';

const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  errorResponse(res, {
    success: false,
    errorMessage: 'Page Not Found Please Check URL. You lost your track!',
    statusCode: 404,
    nextUrl: {},
  });
};

export default notFoundErrorHandler;
