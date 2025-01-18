import { Response } from 'express';

type SuccessResponse = {
  success: true;
  message: string;
  statusCode: number;
  data: object | [] | string | number | boolean;
};

const successResponse = (
  res: Response,
  { success, message, statusCode, data }: SuccessResponse,
) => {
  res.status(statusCode).send({
    success,
    message,
    data,
  });
};

type ErrorResponse = {
  success: false;
  message: string | object;
  statusCode: number;
  nextUrl: object;
  stack?: string;
};

const errorResponse = (
  res: Response,
  { success, message, statusCode, nextUrl, stack }: ErrorResponse,
) => {
  res.status(statusCode).send({
    success,
    message,
    nextUrl,
    stack: process.env.NODE_ENV === 'development' ? stack : {},
  });
};

export { successResponse, errorResponse };
