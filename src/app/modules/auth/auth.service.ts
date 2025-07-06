import status from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const email = payload.email;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(status.BAD_REQUEST, 'User already exist');
  }

  const result = await User.create(payload);
  return result;
};

const loginUserFromDB = async (payload: TUser) => {
  // Get User data using static Method
  const user = await User.checkIsUserExistByEmail(payload?.email);

  // - Checking if the user exists in the database
  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }
  // - Checking if the user account is deleted
  if (user.isDeleted) {
    throw new AppError(401, 'Invalid credentials');
  }
  // - Checking if the user account is blocked
  if (user.isBlocked) {
    throw new AppError(401, 'Invalid credentials');
  }
  // - Verifying if the provided password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(401, 'Invalid credentials');
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };

  console.log(jwtPayload);

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });

  return { Token: accessToken };
};

export const authService = {
  createUserIntoDB,
  loginUserFromDB,
};
