import { AppError } from '../../domain/errors/appError';
import { Logger } from '../../infrastructure/loggers/logger';

export class ErrorHandler {
  public static handleError(err: AppError): void {
    if (!err.isOperational) {
      Logger.error(`Erro crítico: ${err.message}`, err);
    } else {
      Logger.info(`Erro operacional: ${err.message}`);
    }
  }

  public static isTrustedError(error: Error): boolean {
    return error instanceof AppError;
  }
}
