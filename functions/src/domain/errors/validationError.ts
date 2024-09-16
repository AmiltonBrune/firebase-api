import { Response } from 'express';
import { formatResponse } from '../../infrastructure/utils/responseFormatter';
import { AppError } from './appError';

export class ValidationError extends AppError {
  public readonly validationField: string | undefined;
  constructor(message: string, validationField?: string) {
    super(message, 400, true);
    this.validationField = validationField;
  }

  public sendFormattedResponse(res: Response): Response {
    return formatResponse.error(res, this.statusCode, this.message);
  }
}
