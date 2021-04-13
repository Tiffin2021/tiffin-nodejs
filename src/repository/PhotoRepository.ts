import { IPhotoRepository } from './interfaces/IPhotoRepository';
import { Photo } from '../model/Photo';
import { Database, DatabaseResult } from '../utils/database';

// 画像テーブルを操作するRepositoryクラスを実装します。
export class PhotoRepository implements IPhotoRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  /**
   * 画像一覧の取得
   * @returns 画像一覧
   */
  getAll(): Promise<DatabaseResult<Photo[]>> {
    const query = {
      text: `
        SELECT 
          * 
        FROM
          photos
        ORDER BY 
          updated_at DESC
      `,
    };

    return this.database.query<Photo>(query);
  }

  /**
   * 店舗ごとの画像一覧の取得
   * @returns 画像一覧
   */
  getByShopInfoID(shopInfoID: number): Promise<DatabaseResult<Photo[]>> {
    const query = {
      text: `
        SELECT
          *
        FROM
          photos
        WHERE
          shop_info_id = $1
        ORDER BY
          updated_at DESC
      `,
      values: [shopInfoID],
    };

    return this.database.query<Photo>(query);
  }

  /**
   * 画像をIDで1件取得
   * @param  {number} id 画像ID
   * @returns 画像
   */
  getByID(id: number): Promise<DatabaseResult<Photo>> {
    const query = {
      text: `
        SELECT
          *
        FROM 
          photos
        WHERE 
          id = $1
      `,
      values: [id],
    };

    return this.database.queryOne<Photo>(query);
  }

  /**
   * 画像を1件作成
   * @param  {Photo} photo 画像
   * @returns 画像ID
   */
  create(photo: Photo): Promise<DatabaseResult<number>> {
    const query = {
      text: `
        INSERT INTO 
          photos (pass, genre, prefecture, area, station, price, menu, opentime, closetime, shop_info_id) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `,
      values: [
        photo.pass,
        photo.genre,
        photo.prefecture,
        photo.area,
        photo.station,
        photo.price,
        photo.menu,
        photo.opentime,
        photo.closetime,
        photo.shop_info_id,
      ],
    };

    return this.database.insert(query);
  }

  /**
   * 画像を1件更新
   * @param  {number} id 画像ID
   * @param  {Photo} photo 画像
   * @returns 画像
   */
  async update(id: number, photo: Photo): Promise<DatabaseResult> {
    const query = {
      text: `
        UPDATE 
          photos
        SET 
          pass = $1, genre = $2, prefecture = $3, area = $4, station = $5, price = $6, menu = $7, opentime = $8, closetime = $9, shop_info_id = $10
        WHERE
          id = $11
      `,
      values: [
        photo.pass,
        photo.genre,
        photo.prefecture,
        photo.area,
        photo.station,
        photo.price,
        photo.menu,
        photo.opentime,
        photo.closetime,
        photo.shop_info_id,
        id,
      ],
    };

    return this.database.update(query);
  }

  /**
   * 画像を1件削除
   * @param  {number} id 画像ID
   */
  delete(id: number): Promise<DatabaseResult> {
    const query = {
      text: `
        DELETE FROM 
          photos
        WHERE 
          id = $1
      `,
      values: [id],
    };

    return this.database.delete(query);
  }

  //#region Transaction関連

  /**
   * Transactionの開始
   * @returns void
   */
  transaction(): void {
    this.database.transaction();
  }

  /**
   * Commit実行（データベースの処理を確定する）
   * @returns void
   */
  commit(): void {
    this.database.commit();
  }

  /**
   * RollBack実行（データベースの処理をなかったコトにする）
   * @returns void
   */
  rollback(): void {
    this.database.rollback();
  }

  //#endregion
}
