import { StationMaster } from '../model/StationMaster';
import { IStationMasterRepository } from '../repository/interfaces/IStationMasterRepository';
import { IStationMasterService } from './interfaces/IStationMasterService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { DatabaseErrorMessages } from '../utils/database';
import { Result } from '../utils/types/Result';

export class StationMasterService implements IStationMasterService {
  private repository: IStationMasterRepository;

  constructor(repository: IStationMasterRepository) {
    this.repository = repository;
  }
  async getAll(): Promise<Result<StationMaster[]>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<StationMaster[]> = {};

    // ステーションマスターを取得する
    const getAllResult = await this.repository.getAll();
    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (getAllResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = getAllResult.error;
      console.log(result.error);
      return result;
    }

    result.statusCode = HttpStatusCode.OK;
    result.value = getAllResult.value;
    return result;
  }
}
