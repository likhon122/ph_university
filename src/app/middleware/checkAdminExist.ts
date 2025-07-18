import httpStatus from 'http-status';

import AppError from '../errors/AppError';
import { Admin } from '../modules/admin/admin.model';
import catchAsync from '../utils/catchAsync';
import fs from 'fs/promises';

const checkAdminExist = catchAsync(async (req, res, next) => {
  const { admin: adminInfo } = req.body;

  const existAdmin = await Admin.findOne({
    $or: [{ email: adminInfo.email }, { contactNo: adminInfo.contactNo }],
  });

  if (existAdmin?.email === adminInfo.email) {
    if (req.file) {
      await fs.unlink(req.file?.path);
    }
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Email already exist. Please try with another email',
    );
  } else if (existAdmin?.contactNo === adminInfo.contactNo) {
    if (req.file) {
      await fs.unlink(req.file?.path);
    }
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Contact number already exist. Please try with another contact number',
    );
  }

  next();
});

export default checkAdminExist;
