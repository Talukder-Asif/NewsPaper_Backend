import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

export const userController = {
  createUser,
};
