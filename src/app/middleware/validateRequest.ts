import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    return next();
  });
};

export default validateRequest;
