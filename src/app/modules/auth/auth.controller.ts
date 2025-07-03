import { envMode } from '../../configs';
import catchAsync from '../../utils/catchAsync';
import getClientIp from '../../utils/getIpAddress';
import { successResponse } from '../../utils/response';
import {
  changePasswordHandler,
  loginUserHandler,
  refreshTokenHandler,
} from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserHandler(req.body);

  const { accessToken, refreshToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: envMode === 'production', // Set to true in production
    httpOnly: true,
  });

  successResponse(res, {
    success: true,
    message: 'User logged in successfully',
    statusCode: 200,
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  // Get the ip address from the request
  const ipAddress = getClientIp(req);

  const result = await changePasswordHandler(req.body, userId, ipAddress);

  successResponse(res, {
    success: true,
    message: 'Password changed successfully',
    statusCode: 200,
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await refreshTokenHandler(refreshToken);

  successResponse(res, {
    success: true,
    message: 'Token refreshed successfully',
    statusCode: 200,
    data: result,
  });
});

export { loginUser, changePassword, refreshToken };
