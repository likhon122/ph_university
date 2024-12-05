import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../../utils/response';
import { getAllUserService } from './student.services';
import StudentModel from './student.model';
import { runValidation, studentSchemaValidation } from './student.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const students = getAllUserService(res, next);

    return successResponse(res, {
      success: true,
      successMessage: 'Students fetched successfully',
      statusCode: 200,
      data: students,
      nextUrl: {},
    });
  } catch (error) {
    next(error);
  }
};

const addStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = req.body.student;

    const { data } = runValidation(studentSchemaValidation, student);

    console.log(data);

    const newStudent = await StudentModel.create(data);

    return successResponse(res, {
      success: true,
      successMessage: 'Student added successfully',
      statusCode: 200,
      data: newStudent,
      nextUrl: {},
    });
  } catch (error) {
    next(error);
  }
};

export { getAllStudents, addStudent };
