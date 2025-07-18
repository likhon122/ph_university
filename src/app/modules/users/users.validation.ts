import { z } from 'zod';
import { userStatus } from './user.constant';

export const passwordValidation = z
  .string()
  .min(8, 'Password must be at least 8 characters long.');

export const updateStatusValidation = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
});
