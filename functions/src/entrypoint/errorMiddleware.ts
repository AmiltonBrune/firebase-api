import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../application/services/errorHandler';
import { AppError } from '../domain/errors/appError';

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (ErrorHandler.isTrustedError(err)) {
    ErrorHandler.handleError(err);
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
