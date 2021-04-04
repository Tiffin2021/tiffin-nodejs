import { ITimeMasterRepository } from './interfaces/ITimeMasterRepository';
import { TimeMaster } from '../model/TimeMaster';
import { Database, DatabaseResult } from '../utils/database';

// マスターステーションを操作するRepositoryクラスを実装します。
export class TimeMasterRepository implements ITimeMasterRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  /**
   * マスターステーション一覧の取得
   * @returns マスターステーション一覧
   */
  getAll(): Promise<DatabaseResult<TimeMaster[]>> {
    const query = {
      text: `
        SELECT 
          * 
        FROM
          times
      `,
    };

    return this.database.query<TimeMaster>(query);
  }
}
