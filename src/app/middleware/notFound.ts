import { RequestHandler } from 'express';
import status from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const NotFound: RequestHandler = (req, res, next) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: `API not found - ${req.originalUrl}`,
    error: ` `,
  });
};

export default NotFound;
