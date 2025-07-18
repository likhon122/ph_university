import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required for login'),
    password: z.string().min(1, 'Password is required for login'),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z
      .string()
      .min(1, 'Old password is required for change password'),
    newPassword: z
      .string()
      .min(1, 'New password is required for change password'),
  }),
});

const refreshTokenValidation = z.object({
  cookies: z.object(
    {
      refreshToken: z
        .string({
          required_error: 'Refresh token is required',
          invalid_type_error: 'Refresh token must be a string',
        })
        .min(1, 'Refresh token is required'),
    },
    {
      required_error: 'Cookies object is required for refresh token validation',
    },
  ),
});

const forgotPasswordValidation = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required for forgot password'),
  }),
});

const resetPasswordValidation = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required for reset password'),
    newPassword: z
      .string()
      .min(1, 'New password is required for reset password'),
  }),
});

export {
  loginValidation,
  changePasswordValidation,
  refreshTokenValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};
