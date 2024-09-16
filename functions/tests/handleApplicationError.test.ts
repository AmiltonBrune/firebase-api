import { handleApplicationError } from '../src/application/services/handleApplicationError';
import { AppError } from '../src/domain/errors/appError';
import { formatResponse } from '../src/infrastructure/utils/responseFormatter';

// Mock do formatResponse
jest.mock('../src/infrastructure/utils/responseFormatter', () => ({
  formatResponse: {
    error: jest.fn(),
  },
}));

describe('handleApplicationError', () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  test('should call formatResponse.error when an AppError is passed', () => {
    const error = new AppError('Test error', 400);
    handleApplicationError(error, res);

    expect(formatResponse.error).toHaveBeenCalledWith(res, 400, 'Test error');
  });

  test('should handle generic errors', () => {
    const error = new Error('Unexpected error');
    handleApplicationError(error, res);

    expect(formatResponse.error).toHaveBeenCalledWith(
      res,
      500,
      'Unexpected error'
    );
  });
});
