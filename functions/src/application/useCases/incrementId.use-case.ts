import { FirestoreRepository } from '../../infrastructure/repository/firestore.repository';

export class IncrementIdUseCase {
  private repository: FirestoreRepository;

  constructor(repository: FirestoreRepository) {
    this.repository = repository;
  }

  async execute(docId: string): Promise<void> {
    const nextIncrementId = await this.repository.getNextIncrementId();
    await this.repository.updateDocument(docId, {
      increment_id: nextIncrementId,
    });
  }
}
