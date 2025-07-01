import express from 'express';
import {
  createSemesterRegistrationValidation,
  updateSemesterRegistrationValidation,
} from './semesterRegistration.validation';
import validateRequest from '../../middleware/validateRequest';
import {
  createSemesterRegistration,
  deleteSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
} from './semesterRegistration.controller';

const semesterRegistrationRouter = express.Router();

// Register a new semester
semesterRegistrationRouter.post(
  '/create-semester-registration',
  validateRequest(createSemesterRegistrationValidation),
  createSemesterRegistration,
);

// get single semester registration
semesterRegistrationRouter.get('/:id', getSingleSemesterRegistration);

// get all semester registration
semesterRegistrationRouter.get('/', getAllSemesterRegistrations);

// Update semester registration
semesterRegistrationRouter.patch(
  '/:id',
  validateRequest(updateSemesterRegistrationValidation),
  updateSemesterRegistration,
);

// Delete a single registration
semesterRegistrationRouter.delete('/:id', deleteSemesterRegistration);

export default semesterRegistrationRouter;
