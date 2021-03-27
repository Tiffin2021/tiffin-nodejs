import { IRepository } from '../repository/interfaces/IRepository';
import { Database } from '../utils/database';

export class Repository implements IRepository {
  protected database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  transaction(): void {
    this.database.transaction();
  }

  commit(): void {
    this.database.commit();
  }

  rollback(): void {
    this.database.rollback();
  }
}
