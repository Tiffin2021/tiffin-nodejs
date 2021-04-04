import { StationMaster } from '../../model/StationMaster';
import { Result } from '../../utils/types/Result';

export interface IStationMasterService {
  getAll(): Promise<Result<StationMaster[]>>;
}
