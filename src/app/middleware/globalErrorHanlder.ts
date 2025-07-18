import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { envMode } from '../configs';
import zodErrorHandler from '../errors/zodErrorHandler';
import { TErrorSource } from '../interface/error.interface';
import castErrorHandler from '../errors/castErrorHandler';
import duplicateValueError from '../errors/duplicateValueError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Initialize the all errors object property
  let statusCode: number = err.statusCode || 500;
  let message: string = err.message || 'Something went wrong';
  let errorSources: TErrorSource[] = [
    {
      path: '',
      message: err.message || 'Something went wrong',
    },
  ];
  let stack: string =
    'Error: ' +
    (err.stack?.split('\n')[1]?.trim() || 'No stack trace available');

  // Handle ZodError (validation error)
  if (err instanceof ZodError) {
    const zodErrors = zodErrorHandler(err);
    const formattedStack = err.stack
      ? err.stack
          .split('\n')
          .filter(line => line.includes('ph_university'))
          .map(line => line.trim())
          .join('\n')
      : 'No stack trace available';

    // Enhanced stack trace formatting
    statusCode = zodErrors.statusCode;
    message = zodErrors.message;
    errorSources = zodErrors.errorSources;
    stack = formattedStack;

    // Handle Mongoose CastError (invalid ObjectId)
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    const castError = castErrorHandler(err);

    // Enhanced stack trace formatting
    statusCode = castError.statusCode;
    message = castError.message;
    errorSources = castError.errorSources;

    // Handle Duplicate Key Error (MongoError with code 11000)
  } else if (err.code === 11000) {
    const duplicateError = duplicateValueError(err);

    // Enhanced stack trace formatting
    statusCode = duplicateError.statusCode;
    message = duplicateError.message;
    errorSources = duplicateError.errorSources;
    // Handle other errors
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: envMode === 'development' ? stack : null,
  });
  return;
};

export default globalErrorHandler;
