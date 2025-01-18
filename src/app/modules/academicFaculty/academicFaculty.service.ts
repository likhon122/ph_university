import AppError from '../../errors/AppError';
import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const academicFaculty = await AcademicFaculty.create(payload);

  return academicFaculty;
};

const getAllAcademicFacultiesFromDB = async () => {
  const academicFaculties = await AcademicFaculty.find();

  return academicFaculties;
};

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
  const academicFaculty = await AcademicFaculty.findById(facultyId);

  if (!academicFaculty) {
    throw new AppError(404, "Academic faculty doesn't exist with this ID", {});
  }

  return academicFaculty;
};

const updateAcademicFacultyFromDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const [facultyExist, nameAlreadyExist] = await Promise.all([
    AcademicFaculty.findById(facultyId),
    AcademicFaculty.findOne({ name: payload.name }),
  ]);

  if (!facultyExist) {
    throw new AppError(
      404,
      "Academic faculty doesn't exist with this ID or something went wrong! Please try again and make sure you provide correct facultyId!",
      {},
    );
  }

  if (nameAlreadyExist) {
    throw new AppError(
      400,
      'Academic faculty name already exist! Please choose another name',
      {},
    );
  }

  const academicFaculty = await AcademicFaculty.findByIdAndUpdate(
    facultyId,
    payload,
    {
      new: true,
    },
  );

  if (!academicFaculty) {
    throw new AppError(500, 'Something went wrong! Please try again', {});
  }
  return academicFaculty;
};

export {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
};
