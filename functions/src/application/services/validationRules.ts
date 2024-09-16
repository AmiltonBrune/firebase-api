import { ValidationError } from '../../domain/errors/validationError';

export class ValidationRules {
  static required(value: any, fieldName: string): void {
    if (!value || value === '') {
      throw new ValidationError(`${fieldName} é obrigatório.`);
    }
  }

  static isString(value: any, fieldName: string): void {
    if (typeof value !== 'string') {
      throw new ValidationError(`${fieldName} deve ser uma string.`);
    }
  }

  static minLength(value: string, fieldName: string, min: number): void {
    if (value.length < min) {
      throw new ValidationError(
        `${fieldName} deve ter no mínimo ${min} caracteres.`
      );
    }
  }

  static maxLength(value: string, fieldName: string, max: number): void {
    if (value.length > max) {
      throw new ValidationError(
        `${fieldName} deve ter no máximo ${max} caracteres.`
      );
    }
  }
}
