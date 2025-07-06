import { IBlogPost } from './blog.interface';
import { Types } from 'mongoose';
import slugify from 'slugify';
import { BlogPost } from './blog.model';

const createBlogPostIntoDB = async (payload: IBlogPost, id: string) => {
  payload.author = new Types.ObjectId(id);

  if (!payload?.slug) {
    payload.slug = slugify(payload.title, { lower: true, strict: true });
  }

  // If slug is available
  while (await BlogPost.findOne({ slug: payload.slug })) {
    const randomFourDigit = Math.floor(1000 + Math.random() * 9000);
    payload.slug = payload.slug + randomFourDigit.toString();
  }

  const result = await BlogPost.create(payload);

  return result;
};

export const blogService = {
  createBlogPostIntoDB,
};
