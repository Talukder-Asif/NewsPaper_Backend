import status from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';

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

  console.log(user);

  return null;
};

export const authService = {
  createUserIntoDB,
  loginUserFromDB,
};
