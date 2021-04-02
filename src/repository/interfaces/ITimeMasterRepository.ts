import { TimeMaster } from '../../model/TimeMaster';
import { DatabaseResult } from '../../utils/database/Database';

// マスターステーションに対する操作の振る舞いを定義します。
export interface ITimeMasterRepository {
  /**
   * マスターステーション一覧の取得
   * @returns マスターステーション
   */
  getAll(): Promise<DatabaseResult<TimeMaster[]>>;
}
