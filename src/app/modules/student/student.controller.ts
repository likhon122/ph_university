import { successResponse } from '../../utils/response';
import {
  deleteStudentService,
  getAllUserService,
  getSingleStudentService,
  updateStudentService,
} from './student.service';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const students = await getAllUserService(req.query);

  return successResponse(res, {
    success: true,
    message: 'Students retrieve successfully',
    statusCode: 200,
    data: { students },
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const student = await getSingleStudentService(studentId);

  return successResponse(res, {
    success: true,
    message: 'Student retrieve successfully',
    statusCode: 200,
    data: { student },
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const { deletedStudent, deletedUser } = await deleteStudentService(studentId);

  return successResponse(res, {
    success: true,
    message: 'Student deleted successfully',
    statusCode: 200,
    data: { deletedStudent, deletedUser },
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const updatedStudent = await updateStudentService(
    studentId,
    req.body.student,
  );

  return successResponse(res, {
    success: true,
    message: 'Student updated successfully',
    statusCode: 200,
    data: { updatedStudent },
  });
});

export { getAllStudents, deleteStudent, getSingleStudent, updateStudent };
