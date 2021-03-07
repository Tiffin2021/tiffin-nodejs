import { IShopAccountRepository } from './interfaces/IShopAccountRepository';
import { ShopAccount } from '../model/ShopAccount';
import { Client, QueryResult } from 'pg';

// 店舗アカウントテーブルを操作するRepositoryクラスを実装します。
export class ShopAccountRepository implements IShopAccountRepository {
  private connection: Client;

  constructor(connection: Client) {
    this.connection = connection;
  }

  /**
   * 店舗アカウント情報一覧の取得
   * @returns 店舗アカウント情報一覧
   */
  getAll(): Promise<ShopAccount[]> {
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
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopAccount>) => {
        return err ? reject(err) : resolve(result.rows);
      });
    });
  }

  /**
   * 店舗アカウント情報をIDで1件取得
   * @param  {number} id 店舗アカウントID
   * @returns 店舗アカウント情報
   */
  getByID(id: number): Promise<ShopAccount> {
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
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopAccount>) => {
        return err ? reject(err) : resolve(result.rows[0]);
      });
    });
  }

  /**
   * 店舗アカウント情報を1件作成
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウントID
   */
  create(shopAccount: ShopAccount): Promise<number> {
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
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopAccount>) => {
        return err ? reject(err) : resolve(result.rows[0].id);
      });
    });
  }

  /**
   * 店舗アカウント情報を1件更新
   * @param  {number} id 店舗アカウントID
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウント情報
   */
  update(id: number, shopAccount: ShopAccount): Promise<ShopAccount> {
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

    shopAccount.id = id;

    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopAccount>) => {
        return err ? reject(err) : resolve(shopAccount);
      });
    });
  }

  /**
   * 店舗アカウント情報を1件削除
   * @param  {number} id 店舗アカウントID
   */
  delete(id: number): Promise<void> {
    const query = {
      text: `
        DELETE FROM 
          shop_accounts 
        WHERE 
          id = $1
      `,
      values: [id],
    };

    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopAccount>) => {
        return err ? reject(err) : resolve();
      });
    });
  }
}
