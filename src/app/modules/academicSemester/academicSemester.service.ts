import AppError from '../../errors/AppError';
import { semesterCodeAndNameMap } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // Checking code and name is matched or not

  if (semesterCodeAndNameMap[payload.name] !== payload.code) {
    throw new AppError(
      400,
      `Code and Name is not matched! Please provide correct code for ${payload.name}! We think code for ${payload.name} is ${semesterCodeAndNameMap[payload.name]}`,
    );
  }

  const academicSemester = await AcademicSemester.create(payload);

  return academicSemester;
};

const getAcademicSemestersFromDB = async () => {
  const academicSemesters = await AcademicSemester.find();

  return academicSemesters;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const academicSemester = await AcademicSemester.findById(id);

  if (!academicSemester) {
    throw new AppError(404, "Academic Semester doesn't exist with this ID");
  }

  return academicSemester;
};

const updateAcademicSemesterFromDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    semesterCodeAndNameMap[payload.name] !== payload.code
  ) {
    throw new AppError(
      400,
      `Code and Name is not matched! Please provide correct code for ${payload.name}! We think code for ${payload.name} is ${semesterCodeAndNameMap[payload.name]}`,
    );
  }

  const academicSemester = await AcademicSemester.findByIdAndUpdate(
    id,
    payload,
    { new: true },
  );

  if (!academicSemester) {
    throw new AppError(
      404,
      "Academic Semester doesn't exist with this ID or something went wrong! Please try again and make sure you provide correct semester id!",
    );
  }
  return academicSemester;
};

export {
  createAcademicSemesterIntoDB,
  getAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
