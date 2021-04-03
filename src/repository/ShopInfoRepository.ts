import { IShopInfoRepository } from './interfaces/IShopInfoRepository';
import { ShopInfo } from '../model/ShopInfo';
import { Database, DatabaseResult } from '../utils/database';

// 店舗アカウントテーブルを操作するRepositoryクラスを実装します。
export class ShopInfoRepository implements IShopInfoRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  /**
   * 店舗アカウント情報一覧の取得
   * @returns 店舗アカウント情報一覧
   */
  getAll(): Promise<DatabaseResult<ShopInfo[]>> {
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

    return this.database.query<ShopInfo>(query);
  }

  /**
   * 店舗アカウント情報をIDで1件取得
   * @param  {number} id 店舗アカウントID
   * @returns 店舗アカウント情報
   */
  getByID(id: number): Promise<DatabaseResult<ShopInfo>> {
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

    return this.database.queryOne<ShopInfo>(query);
  }

  /**
   * 店舗アカウント情報を1件作成
   * @param  {ShopInfo} shopInfo 店舗アカウント情報
   * @returns 店舗アカウントID
   */
  create(shopInfo: ShopInfo): Promise<DatabaseResult<number>> {
    const query = {
      text: `
        INSERT INTO 
          shop_info (name, address, station, tel, opentime, closetime, shop_accounts_id) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `,
      values: [
        shopInfo.name,
        shopInfo.address,
        shopInfo.station,
        shopInfo.tel,
        shopInfo.opentime,
        shopInfo.closetime,
        shopInfo.shop_accounts_id,
      ],
    };

    return this.database.insert(query);
  }

  /**
   * 店舗アカウント情報を1件更新
   * @param  {number} id 店舗アカウントID
   * @param  {ShopInfo} shopInfo 店舗アカウント情報
   * @returns 店舗アカウント情報
   */
  update(id: number, shopInfo: ShopInfo): Promise<DatabaseResult> {
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
        id,
      ],
    };

    console.log(shopInfo.name);

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
          shop_info
        WHERE 
          id = $1
      `,
      values: [id],
    };

    return this.database.delete(query);
  }
}