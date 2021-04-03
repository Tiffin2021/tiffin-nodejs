import { Genre } from '../../model/Genre';
import { Result } from '../../utils/types/Result';

export interface IGenreService {
  getAll(): Promise<Result<Genre[]>>;
}
