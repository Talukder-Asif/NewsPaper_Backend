import status from 'http-status';
import AppError from '../../errors/AppError';
import { IBlogPost } from './blog.interface';

export const isAuthorOfBlog = (isAuthorized: IBlogPost, userId: string) => {
  if (isAuthorized.author.toString() !== userId) {
    throw new AppError(
      status.BAD_REQUEST,
      `You don't have authority to update this post!`,
    );
  }
};
