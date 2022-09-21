import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './interfaces/ErrorResponse';
import jwt from 'jsonwebtoken';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export const isAuthenticated = (
  // TEMP - set req to any to test if the payload can be passed in the body
  // prefer to set type to Request from 'express' but encountering errors
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({ message: 'Un-authorized' });
    throw new Error('Un-authorized');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, `${process.env.JWT_ACCESS_SECRET}`);
    // considering using req.body.payload since the req.body typing is set to any as a temporary measure
    req.payload = payload;
  } catch (err) {
    res.status(401);
    if (err instanceof Error) {
      if (err.name === 'TokenExpiredError') {
        throw new Error(err.name);
      }
      throw new Error(`Un-authorized: ${err.name}`);
    }
  }
  return next();
};
