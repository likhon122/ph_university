import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import {
  deleteAdminFromDB,
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
} from './admin.service';

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleAdminFromDB(id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved successfully',
    data: { result },
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await getAllAdminsFromDB(req.query);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await updateAdminIntoDB(id, admin);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: { result },
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteAdminFromDB(id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  });
});

export { getAllAdmins, getSingleAdmin, deleteAdmin, updateAdmin };
