import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import { changePasswordHandler, loginUserHandler } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserHandler(req.body);

  successResponse(res, {
    success: true,
    message: 'User logged in successfully',
    statusCode: 200,
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await changePasswordHandler(req.body, userId);

  successResponse(res, {
    success: true,
    message: 'Password changed successfully',
    statusCode: 200,
    data: result,
  });
});

export { loginUser, changePassword };
