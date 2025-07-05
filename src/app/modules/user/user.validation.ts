import z from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),

    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),

    role: z.enum(['admin', 'user']).default('user'),

    isBlocked: z.boolean().default(false),

    isDeleted: z.boolean().default(false),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
