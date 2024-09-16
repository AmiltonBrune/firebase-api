import * as admin from 'firebase-admin';
import { UserEntity } from '../../domain/entities/user.entity';

export class FirestoreRepository {
  private db = admin.firestore();
  private collection = 'myCollection';

  async addDocument(
    document: UserEntity
  ): Promise<FirebaseFirestore.DocumentReference> {
    return this.db.collection(this.collection).add(document);
  }

  async getNextIncrementId(): Promise<number> {
    const snapshot = await this.db
      .collection(this.collection)
      .orderBy('increment_id', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return 1;
    }

    const lastDoc = snapshot.docs[0];
    return lastDoc.data().increment_id + 1;
  }

  async updateDocument(
    docId: string,
    data: Partial<UserEntity>
  ): Promise<void> {
    await this.db.collection(this.collection).doc(docId).update(data);
  }
}
