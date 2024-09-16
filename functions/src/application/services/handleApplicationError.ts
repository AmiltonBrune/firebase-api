import { Response } from 'express';
import { AppError } from '../../domain/errors/appError';
import { ErrorHandler } from '../../application/services/errorHandler';
import { Messages } from '../../infrastructure/constants/messages';
import { formatResponse } from '../../infrastructure/utils/responseFormatter';

export const handleApplicationError = (error: unknown, res: Response) => {
  let err: AppError;

  if (error instanceof AppError) {
    err = error;
  } else if (error instanceof Error) {
    err = new AppError(error.message, 500);
  } else {
    err = new AppError(Messages.error.UNEXPECTED_ERROR, 500, false);
  }

  ErrorHandler.handleError(err);

  return formatResponse.error(res, err.statusCode, err.message);
};
