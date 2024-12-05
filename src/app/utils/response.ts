import { Response } from 'express';

type SuccessResponse = {
  success: true;
  successMessage: string;
  statusCode: number;
  data: object | [] | string | number | boolean;
  nextUrl: object;
};

const successResponse = (
  res: Response,
  { success, successMessage, statusCode, data, nextUrl }: SuccessResponse,
) => {
  res.status(statusCode).send({
    success,
    successMessage,
    statusCode,
    data,
    nextUrl,
  });
};

type ErrorResponse = {
  success: false;
  errorMessage: string | object;
  statusCode: number;
  nextUrl: object;
};

const errorResponse = (
  res: Response,
  { success, errorMessage, statusCode, nextUrl }: ErrorResponse,
) => {
  res.status(statusCode).send({
    success,
    errorMessage,
    statusCode,
    nextUrl,
  });
};

export { successResponse, errorResponse };
