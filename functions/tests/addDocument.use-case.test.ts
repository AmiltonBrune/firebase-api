import { AddDocumentUseCase } from '../src/application/useCases/addDocument.use-case';
import { FirestoreRepository } from '../src/infrastructure/repository/firestore.repository';

jest.mock('../src/infrastructure/repository/firestore.repository', () => {
  return {
    FirestoreRepository: jest.fn().mockImplementation(() => ({
      addDocument: jest.fn(),
    })),
  };
});

describe('AddDocumentUseCase', () => {
  let addDocumentUseCase: AddDocumentUseCase;
  let firestoreRepository: FirestoreRepository;

  beforeEach(() => {
    firestoreRepository = new FirestoreRepository();
    addDocumentUseCase = new AddDocumentUseCase(firestoreRepository);
  });

  test('should call addDocument with correct parameters', async () => {
    const name = 'Marcos Feliz';
    await addDocumentUseCase.execute({ name });

    expect(firestoreRepository.addDocument).toHaveBeenCalledWith({ name });
  });

  test('should throw an error if addDocument fails', async () => {
    (firestoreRepository.addDocument as jest.Mock).mockRejectedValue(
      new Error('Firestore error')
    );

    await expect(
      addDocumentUseCase.execute({ name: 'Marcos Feliz' })
    ).rejects.toThrow('Firestore error');
  });
});
