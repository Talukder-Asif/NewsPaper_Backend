import z from 'zod';

const createBlogPostZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    slug: z.string().optional(), // Optional, will be auto-generated
    content: z.string({
      required_error: 'Content is required',
    }),
    isPublished: z.boolean().optional(),
    isDelete: z.boolean().optional(),
  }),
});

const updateBlogPostZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    content: z.string().optional(),
    isPublished: z.boolean().optional(),
    isDelete: z.boolean().optional(),
  }),
});

export const blogPostValidation = {
  createBlogPostZodSchema,
  updateBlogPostZodSchema,
};
