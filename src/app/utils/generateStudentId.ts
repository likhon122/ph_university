import { TAcademicSemester } from '../modules/academicSemester/academicSemester.interface';
import Student from '../modules/student/student.model';

const findLastStudentId = async (payload: TAcademicSemester) => {
  const lastStudentId = await Student.findOne(
    { role: 'student', admissionSemester: payload._id },
    { _id: 0, id: 1 },
  )
    .sort({ createdAt: -1 })
    .lean();

  if (lastStudentId?.id) {
    return lastStudentId.id.substring(6);
  } else {
    return undefined;
  }
};

const generateStudentId = async (payload: TAcademicSemester) => {
  const { year, code } = payload;

  // Find last student Id
  const firstTimeId = Number(await findLastStudentId(payload)) || 0;

  // Increase the last student id by 1
  const inCreaseId = (firstTimeId + 1).toString().padStart(4, '0');
  const id = `${year}${code}${inCreaseId}`;

  return id;
};

export default generateStudentId;
