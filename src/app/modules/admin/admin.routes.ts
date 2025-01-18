import express from 'express';
import {
  deleteAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
} from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';

const adminRoutes = express.Router();

adminRoutes.get('/get-all-admin', getAllAdmins);

adminRoutes.get('/:id', getSingleAdmin);

adminRoutes.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  updateAdmin,
);

adminRoutes.delete('/:adminId', deleteAdmin);

export default adminRoutes;
