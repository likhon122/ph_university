import express from 'express';
import {
  deleteAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
} from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';
import auth from '../../middleware/auth';
import { User_Roles } from '../users/user.constant';

const adminRoutes = express.Router();

adminRoutes.get('/get-all-admin', auth(User_Roles.admin), getAllAdmins);

adminRoutes.get('/:id', getSingleAdmin);

adminRoutes.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  updateAdmin,
);

adminRoutes.delete('/:adminId', deleteAdmin);

export default adminRoutes;
