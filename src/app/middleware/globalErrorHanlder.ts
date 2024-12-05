/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Handle ZodError (validation error)
  if (err instanceof ZodError) {
    const zodErrors = err.errors.map((e: any) => ({
      path: e.path.join('.'),
      message: e.message,
    }));

    res.status(400).json({
      message: 'Validation error',
      success: false,
      error: {
        name: 'ZodError',
        errors: zodErrors,
      },
      stack: 'No stack trace available',
    });
    return;
  }

  // Handle Duplicate Key Error (MongoError with code 11000)
  if (err.code === 11000) {
    // Get the name of the field causing the duplicate key error (e.g., "email")
    const duplicateField = Object.keys(err.keyValue)[0];
    const duplicateValue = err.keyValue[duplicateField];

    res.status(400).json({
      message: `Duplicate value error: The ${duplicateField} "${duplicateValue}" is already in use. Please choose a different ${duplicateField}.`,
      success: false,
      error: {
        name: err.name,
        errors: {
          [duplicateField]: `The ${duplicateField} "${duplicateValue}" is already registered.`,
        },
      },
      stack: `MongoServerError: Duplicate key error on ${duplicateField}: "${duplicateValue}". Full error details: ${err.message}`,
    });
    return;
  }

  // Handle other errors
  const firstStackLine =
    'Error: ' +
    (err.stack?.split('\n')[1]?.trim() || 'No stack trace available');

  res.status(500).json({
    message: err.message,
    success: false,
    error: {
      name: err.name,
      errors: (err as any).errors || {},
    },
    stack: firstStackLine,
  });
  return;
};

export default globalErrorHandler;
