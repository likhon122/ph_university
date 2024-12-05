import { NextFunction, Request, Response } from 'express';
import { createStudentService } from './users.service';
import { createStudentValidation } from '../student/student.validation';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;

    const newStudentData = createStudentValidation.parse(student);

    const { newUser, newStudent } = await createStudentService(
      newStudentData,
      password,
    );

    res.status(201).json({
      status: 'success',
      message: 'Student created successfully.',
      data: {
        newUser,
        newStudent,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { createStudent };
