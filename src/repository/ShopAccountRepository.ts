import { IShopAccountRepository } from './interfaces/IShopAccountRepository';
import { ShopAccount } from '../model/ShopAccount';
import { Database, DatabaseResult } from '../utils/database/Database';

// 店舗アカウントテーブルを操作するRepositoryクラスを実装します。
export class ShopAccountRepository implements IShopAccountRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  /**
   * 店舗アカウント情報一覧の取得
   * @returns 店舗アカウント情報一覧
   */
  getAll(): Promise<DatabaseResult<ShopAccount[]>> {
    const query = {
      text: `
        SELECT 
          * 
        FROM
          shop_accounts
        ORDER BY 
          updated_at DESC
      `,
    };

    return this.database.query<ShopAccount>(query);
  }

  /**
   * 店舗アカウント情報をIDで1件取得
   * @param  {number} id 店舗アカウントID
   * @returns 店舗アカウント情報
   */
  getByID(id: number): Promise<DatabaseResult<ShopAccount>> {
    const query = {
      text: `
        SELECT
          *
        FROM 
          shop_accounts
        WHERE 
          id = $1
      `,
      values: [id],
    };

    return this.database.queryOne<ShopAccount>(query);
  }

  /**
   * 店舗アカウント情報を1件作成
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウントID
   */
  create(shopAccount: ShopAccount): Promise<DatabaseResult<number>> {
    const query = {
      text: `
        INSERT INTO 
          shop_accounts (email, pass) 
        VALUES 
          ($1, $2)
        RETURNING id
      `,
      values: [shopAccount.email, shopAccount.pass],
    };

    return this.database.insert(query);
  }

  /**
   * 店舗アカウント情報を1件更新
   * @param  {number} id 店舗アカウントID
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウント情報
   */
  async update(id: number, shopAccount: ShopAccount): Promise<DatabaseResult> {
    const query = {
      text: `
        UPDATE 
          shop_accounts 
        SET 
          email = $1, pass = $2
        WHERE 
          id = $3
      `,
      values: [shopAccount.email, shopAccount.pass, id],
    };

    return this.database.update(query);
  }

  /**
   * 店舗アカウント情報を1件削除
   * @param  {number} id 店舗アカウントID
   */
  delete(id: number): Promise<DatabaseResult> {
    const query = {
      text: `
        DELETE FROM 
          shop_accounts 
        WHERE 
          id = $1
      `,
      values: [id],
    };

    return this.database.delete(query);
  }
}
