import { NextFunction, Response } from 'express';
import StudentModel from './student.model';
import { errorResponse } from '../../utils/response';

const getAllUserService = async (res: Response, next: NextFunction) => {
  try {
    const students = await StudentModel.find();

    if (!students) {
      return errorResponse(res, {
        success: false,
        errorMessage: 'No students found',
        statusCode: 404,
        nextUrl: {},
      });
    }
  } catch (error) {
    next(error);
  }
};

export { getAllUserService };
