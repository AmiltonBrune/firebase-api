import { validateAddDocumentPayload } from '../src/middleware/validatePayload';
import { Request, Response } from 'express';
import { formatResponse } from '../src/infrastructure/utils/responseFormatter';

jest.mock('../src/infrastructure/utils/responseFormatter', () => ({
  formatResponse: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

function mockResponse(): Response {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res as Response;
}

function mockRequest(body: any): Partial<Request> {
  return { body };
}

describe('validateAddDocumentPayload', () => {
  test('should return 400 error when name is missing', () => {
    const req = mockRequest({});
    const res = mockResponse();
    const next = jest.fn();

    validateAddDocumentPayload(req as Request, res, next);

    expect(formatResponse.error).toHaveBeenCalledWith(
      res,
      400,
      expect.any(String)
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 error when name is not a string', () => {
    const req = mockRequest({ name: 12345 });
    const res = mockResponse();
    const next = jest.fn();

    validateAddDocumentPayload(req as Request, res, next);

    expect(formatResponse.error).toHaveBeenCalledWith(
      res,
      400,
      expect.any(String)
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 error when name is too long', () => {
    const req = mockRequest({ name: 'a'.repeat(51) });
    const res = mockResponse();
    const next = jest.fn();

    validateAddDocumentPayload(req as Request, res, next);

    expect(formatResponse.error).toHaveBeenCalledWith(
      res,
      400,
      expect.any(String)
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('should pass validation with a valid name', () => {
    const req = mockRequest({ name: 'Marcos Feliz' });
    const res = mockResponse();
    const next = jest.fn();

    validateAddDocumentPayload(req as Request, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
});
