import { Response } from 'express';
import { formatResponse } from '../../infrastructure/utils/responseFormatter';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  // Método para formatar a resposta
  public sendFormattedResponse(res: Response): Response {
    return formatResponse.error(res, this.statusCode, this.message);
  }
}
