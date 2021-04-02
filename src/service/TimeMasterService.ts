import { TimeMaster } from '../model/TimeMaster';
import { ITimeMasterRepository } from '../repository/interfaces/ITimeMasterRepository';
import { ITimeMasterService } from './interfaces/ITimeMasterService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { DatabaseErrorMessages } from '../utils/database';
import { Result } from '../utils/types/Result';

export class TimeMasterService implements ITimeMasterService {
  private repository: ITimeMasterRepository;

  constructor(repository: ITimeMasterRepository) {
    this.repository = repository;
  }
  async getAll(): Promise<Result<TimeMaster[]>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<TimeMaster[]> = {};

    // タイムマスターを取得する
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
