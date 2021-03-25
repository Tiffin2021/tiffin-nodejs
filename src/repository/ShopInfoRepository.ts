import { IShopInfoRepository } from './interfaces/IShopInfoRepository';
import { ShopInfo } from '../model/ShopInfo';
import { Client, QueryResult } from 'pg';

// 店舗アカウントテーブルを操作するRepositoryクラスを実装します。
export class ShopInfoRepository implements IShopInfoRepository {
  private connection: Client;

  constructor(connection: Client) {
    this.connection = connection;
  }

  /**
   * 店舗アカウント情報一覧の取得
   * @returns 店舗アカウント情報一覧
   */
  getAll(): Promise<ShopInfo[]> {
    const query = {
      text: `
        SELECT 
          * 
        FROM
          shop_info
        ORDER BY 
          updated_at DESC
      `,
    };
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopInfo>) => {
        return err ? reject(err) : resolve(result.rows);
      });
    });
  }

  /**
   * 店舗アカウント情報をIDで1件取得
   * @param  {number} id 店舗アカウントID
   * @returns 店舗アカウント情報
   */
  getByID(id: number): Promise<ShopInfo> {
    const query = {
      text: `
        SELECT
          *
        FROM 
          shop_info
        WHERE 
          id = $1
      `,
      values: [id],
    };
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopInfo>) => {
        return err ? reject(err) : resolve(result.rows[0]);
      });
    });
  }

  /**
   * 店舗アカウント情報を1件作成
   * @param  {ShopInfo} shopInfo 店舗アカウント情報
   * @returns 店舗アカウントID
   */
  create(shopInfo: ShopInfo): Promise<number> {
    const query = {
      text: `
        INSERT INTO 
          shop_info (name, address, station, tel, opentime, closetime) 
        VALUES 
          ($1, $2)
        RETURNING id
      `,
      values: [
        shopInfo.name,
        shopInfo.address,
        shopInfo.station,
        shopInfo.tel,
        shopInfo.opentime,
        shopInfo.closetime,
      ],
    };
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopInfo>) => {
        return err ? reject(err) : resolve(result.rows[0].id);
      });
    });
  }

  /**
   * 店舗アカウント情報を1件更新
   * @param  {number} id 店舗アカウントID
   * @param  {ShopInfo} shopInfo 店舗アカウント情報
   * @returns 店舗アカウント情報
   */
  update(id: number, shopInfo: ShopInfo): Promise<ShopInfo> {
    const query = {
      text: `
        UPDATE 
          shop_info
        SET 
          name = $1, address = $2, station = $3, tel = $4, opentime = $5, closetime = $6
        WHERE 
          id = $7
      `,
      values: [
        shopInfo.name,
        shopInfo.address,
        shopInfo.station,
        shopInfo.tel,
        shopInfo.opentime,
        shopInfo.closetime,
        shopInfo.id,
      ],
    };

    shopInfo.id = id;

    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopInfo>) => {
        return err ? reject(err) : resolve(shopInfo);
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
          shop_info
        WHERE 
          id = $1
      `,
      values: [id],
    };

    return new Promise((resolve, reject) => {
      this.connection.query(query, (err: Error, result: QueryResult<ShopInfo>) => {
        return err ? reject(err) : resolve();
      });
    });
  }
}
