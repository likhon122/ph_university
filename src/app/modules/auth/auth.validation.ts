import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required for login'),
    password: z.string().min(1, 'Password is required for login'),
  }),
});

export { loginValidation };
