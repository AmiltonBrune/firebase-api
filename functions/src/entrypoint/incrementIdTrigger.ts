import * as functions from 'firebase-functions';
import { FirestoreRepository } from '../infrastructure/repository/firestore.repository';
import { IncrementIdUseCase } from '../application/useCases/incrementId.use-case';
import { ErrorHandler } from '../application/services/errorHandler';
import { AppError } from '../domain/errors/appError';
import { Messages } from '../infrastructure/constants/messages';

const repository = new FirestoreRepository();
const incrementIdUseCase = new IncrementIdUseCase(repository);

export const incrementIdTrigger = functions.firestore
  .document('myCollection/{docId}')
  .onCreate(async (snapshot) => {
    try {
      const docId = snapshot.id;
      await incrementIdUseCase.execute(docId);
    } catch (error) {
      const err =
        error instanceof AppError
          ? error
          : new AppError(Messages.error.UNEXPECTED_ERROR, 500, false);
      ErrorHandler.handleError(err);
    }
  });
