import { IBudgetsRepository } from './interfaces/IBudgetsRepository';
import { Budgets } from '../model/Budget';
import { Database, DatabaseResult } from '../utils/database';

// 予算テーブルを操作するRepositoryクラスを実装します。
export class BudgetsRepository implements IBudgetsRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  /**
   * 予算一覧の一括取得
   * @returns 予算情報一覧
   */
  getAll(): Promise<DatabaseResult<Budgets[]>> {
    const query = {
      text: `
        SELECT 
          * 
        FROM
          budgets
        ORDER BY 
          updated_at DESC
      `,
    };

    return this.database.query<Budgets>(query);
  }
}
