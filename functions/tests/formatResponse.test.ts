import { formatResponse } from '../src/infrastructure/utils/responseFormatter';

describe('formatResponse', () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  test('should return success response', () => {
    formatResponse.success(res, 200, 'Success message', { data: 'test' });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Success message',
      data: { data: 'test' },
    });
  });

  test('should return error response', () => {
    formatResponse.error(res, 400, 'Error message');

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'error',
      message: 'Error message',
      error: null,
    });
  });
});
