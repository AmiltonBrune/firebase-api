import { Response } from 'express';

export const formatResponse = {
  success: (
    res: Response,
    statusCode: number,
    message: string,
    data: any = null
  ) => {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  },

  error: (
    res: Response,
    statusCode: number,
    message: string,
    error: any = null
  ) => {
    return res.status(statusCode).send({
      status: 'error',
      message,
      error,
    });
  },
};
