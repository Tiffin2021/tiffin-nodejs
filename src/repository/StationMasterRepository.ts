import { IStationMasterRepository } from './interfaces/IStationMasterRepository';
import { StationMaster } from '../model/StationMaster';
import { Database, DatabaseResult } from '../utils/database';

// マスターステーションを操作するRepositoryクラスを実装します。
export class StationMasterRepository implements IStationMasterRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  /**
   * マスターステーション一覧の取得
   * @returns マスターステーション一覧
   */
  getAll(): Promise<DatabaseResult<StationMaster[]>> {
    const query = {
      text: `
        SELECT 
          * 
        FROM
          stations
      `,
    };

    return this.database.query<StationMaster>(query);
  }
}
