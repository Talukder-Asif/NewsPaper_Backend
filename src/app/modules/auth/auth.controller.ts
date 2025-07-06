import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await authService.createUserIntoDB(req.body);
  const { _id, name, email, role, isBlocked, isDeleted } = result.toObject();

  const safeResult = {
    _id,
    name,
    email,
    role,
    isBlocked,
    isDeleted,
  };

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: safeResult,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUserFromDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const authController = {
  createUser,
  loginUser,
};
