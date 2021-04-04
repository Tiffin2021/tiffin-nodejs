import { TimeMaster } from '../../model/TimeMaster';
import { Result } from '../../utils/types/Result';

export interface ITimeMasterService {
  getAll(): Promise<Result<TimeMaster[]>>;
}
