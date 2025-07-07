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

// Update an BlogPost
const updateBlogPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const result = await blogService.updateBlogPostIntoDB(req.body, id, userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog Post Updated successfully',
    data: result,
  });
});

export const blogPostController = {
  createBlogPost,
  updateBlogPost,
};
