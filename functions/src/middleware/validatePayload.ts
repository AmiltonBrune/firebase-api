import { Request, Response, NextFunction } from 'express';
import { ValidationRules } from '../application/services/validationRules';
import { formatResponse } from '../infrastructure/utils/responseFormatter';

export const validateAddDocumentPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    ValidationRules.required(name, 'name');
    ValidationRules.isString(name, 'name');
    ValidationRules.minLength(name, 'name', 3);
    ValidationRules.maxLength(name, 'name', 50);

    next();
  } catch (error) {
    formatResponse.error(res, 400, (error as Error).message);
    return;
  }
};
