import { FirestoreRepository } from '../../infrastructure/repository/firestore.repository';
import { UserEntity } from '../../domain/entities/user.entity';

export class AddDocumentUseCase {
  private repository: FirestoreRepository;

  constructor(repository: FirestoreRepository) {
    this.repository = repository;
  }

  async execute(document: UserEntity): Promise<void> {
    await this.repository.addDocument(document);
  }
}
