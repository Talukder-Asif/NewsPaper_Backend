import { IBlogPost } from './blog.interface';
import { Types } from 'mongoose';
import slugify from 'slugify';
import { BlogPost } from './blog.model';
import AppError from '../../errors/AppError';
import status from 'http-status';

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

const updateBlogPostIntoDB = async (
  payload: Partial<IBlogPost>,
  id: string,
  userId: string,
) => {
  // check if the user is authorized of update the post
  const isAuthorized = await BlogPost.findOne({ _id: id });

  if (!isAuthorized) {
    throw new AppError(status.BAD_REQUEST, 'This post is not available!');
  }

  // If title is changed then the slug will also auto change
  if (payload.title && !payload?.slug) {
    payload.slug = slugify(payload.title, { lower: true, strict: true });

    // If slug is available
    while (await BlogPost.findOne({ slug: payload.slug })) {
      const randomFourDigit = Math.floor(1000 + Math.random() * 9000);
      payload.slug = payload.slug + randomFourDigit.toString();
    }
  }

  if (isAuthorized.author.toString() !== userId) {
    throw new AppError(
      status.BAD_REQUEST,
      `You don't have authority to update this post!`,
    );
  }

  const result = await BlogPost.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const blogService = {
  createBlogPostIntoDB,
  updateBlogPostIntoDB,
};
