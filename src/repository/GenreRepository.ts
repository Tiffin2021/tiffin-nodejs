import { IGenreRepository } from './interfaces/IGenreRepository';
import { Genre } from '../model/Genre';
import { Database, DatabaseResult } from '../utils/database';

export class GenreRepository implements IGenreRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  getAll(): Promise<DatabaseResult<Genre[]>> {
    const query = {
      text: `
        SELECT 
          * 
        FROM
          genres
      `,
    };

    return this.database.query<Genre>(query);
  }
}
