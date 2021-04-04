import { Budgets } from '../../model/Budget';
import { DatabaseResult } from '../../utils/database/Database';

// 予算テーブルに対する操作の振る舞いを定義します。
export interface IBudgetsRepository {
  /**
   * 予算一覧の一括取得
   * @returns 予算情報一覧
   */
  getAll(): Promise<DatabaseResult<Budgets[]>>;
}
