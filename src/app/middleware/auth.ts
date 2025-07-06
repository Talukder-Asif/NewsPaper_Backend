import status from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // Check if the token is available
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
    }

    // Check if the token validation is not over
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    console.log(decoded);

    // Send decoded info in the request of express
    req.user = decoded;

    next();
  });
};

export default auth;
