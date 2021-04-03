import { Genre } from '../../model/Genre';
import { DatabaseResult } from '../../utils/database/Database';

export interface IGenreRepository {
  getAll(): Promise<DatabaseResult<Genre[]>>;
}
