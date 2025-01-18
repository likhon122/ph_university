import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const academicDepartment = (
    await AcademicDepartment.create(payload)
  ).populate('academicFaculty');

  return academicDepartment;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const academicDepartments =
    await AcademicDepartment.find().populate('academicFaculty');

  return academicDepartments;
};

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  const academicDepartment =
    await AcademicDepartment.findById(departmentId).populate('academicFaculty');

  if (!academicDepartment) {
    throw new AppError(
      404,
      "Academic Department doesn't exist with this ID",
      {},
    );
  }

  return academicDepartment;
};

const updateAcademicDepartmentFromDB = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const academicDepartment = await AcademicDepartment.findByIdAndUpdate(
    departmentId,
    payload,
    {
      new: true,
    },
  ).populate('academicFaculty');

  if (!academicDepartment) {
    throw new AppError(
      404,
      "Academic department doesn't exist with this ID or something went wrong! Please try again and make sure you provide correct departmentId!",
      {},
    );
  }
  return academicDepartment;
};

export {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
