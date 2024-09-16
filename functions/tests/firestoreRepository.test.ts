import * as admin from 'firebase-admin';
import { FirestoreRepository } from '../src/infrastructure/repository/firestore.repository';

jest.mock('firebase-admin', () => {
  return {
    initializeApp: jest.fn(),
    firestore: jest.fn().mockReturnValue({
      collection: jest.fn(), 
    }),
  };
});

describe('FirestoreRepository', () => {
  let firestoreRepository: FirestoreRepository;
  let collectionReference: any;

  beforeEach(() => {
    firestoreRepository = new FirestoreRepository();

    
    collectionReference = {
      add: jest.fn(),
    };

   
    (admin.firestore().collection as jest.Mock).mockImplementation(
      (collectionPath: string) => {
        if (!collectionPath) {
          throw new Error(
            "Expected 1 argument for 'collectionPath', but got 0"
          );
        }

        return collectionReference;
      }
    );
  });

  test('should add document to Firestore collection', async () => {
    const document = { name: 'Marcos Feliz' };
    await firestoreRepository.addDocument(document);

    expect(admin.firestore().collection).toHaveBeenCalledWith('myCollection'); 
    expect(collectionReference.add).toHaveBeenCalledWith(document); 
  });

  test('should throw an error if Firestore fails', async () => {
    collectionReference.add.mockRejectedValue(new Error('Firestore error'));

    await expect(
      firestoreRepository.addDocument({ name: 'Marcos Feliz' })
    ).rejects.toThrow('Firestore error');
  });
});
