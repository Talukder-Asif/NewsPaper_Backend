import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogService } from './blog.service';

const createBlogPost = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await blogService.createBlogPostIntoDB(req.body, user.userId);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Blog Post created successfully',
    data: result,
  });
});

export const blogPostController = {
  createBlogPost,
};
