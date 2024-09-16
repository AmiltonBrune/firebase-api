import * as functions from 'firebase-functions';
import { Request, Response } from 'firebase-functions';

import { FirestoreRepository } from '../infrastructure/repository/firestore.repository';
import { AddDocumentUseCase } from '../application/useCases/addDocument.use-case';

import { AppError } from '../domain/errors/appError';

import { Messages } from '../infrastructure/constants/messages';

import { formatResponse } from '../infrastructure/utils/responseFormatter';

import { handleApplicationError } from '../application/services/handleApplicationError';
import { applyMiddleware } from '../middleware/applyMiddleware';

const repository = new FirestoreRepository();
const addDocumentUseCase = new AddDocumentUseCase(repository);

const addDocumentHandler = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    throw new AppError(Messages.error.METHOD_NOT_ALLOWED, 405);
  }

  const { name } = req.body;

  try {
    await addDocumentUseCase.execute({ name });
    formatResponse.success(res, 200, Messages.success.DOCUMENT_CREATED);
  } catch (error) {
    handleApplicationError(error, res);
  }
};

export const addDocumentFunction = functions.https.onRequest(
  applyMiddleware(addDocumentHandler, { authenticatedRoute: false })
);
