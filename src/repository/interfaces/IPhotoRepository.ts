import { Photo } from '../../model/Photo';
import { DatabaseResult } from '../../utils/database/Database';

// 画像テーブルに対する操作の振る舞いを定義します。
export interface IPhotoRepository {
  /**
   * 画像一覧の取得
   * @returns 画像一覧
   */
  getAll(): Promise<DatabaseResult<Photo[]>>;

  /**
   * 店舗ごとの画像一覧の取得
   * @returns 画像一覧
   */
  getByShopInfoID(shopInfoID: number): Promise<DatabaseResult<Photo[]>>;

  /**
   * 画像をIDで1件取得
   * @param  {number} id 画像ID
   * @returns 画像
   */
  getByID(id: number): Promise<DatabaseResult<Photo>>;

  /**
   * 画像を1件作成
   * @param  {Photo} photo 画像
   * @returns 画像ID
   */
  create(photo: Photo): Promise<DatabaseResult<number>>;

  /**
   * 画像を1件更新
   * @param  {number} id 画像ID
   * @param  {Photo} photo 画像
   * @returns 画像
   */
  update(id: number, photo: Photo): Promise<DatabaseResult>;

  /**
   * 画像を1件削除
   * @param  {number} id 画像ID
   */
  delete(id: number): Promise<DatabaseResult>;

  /**
   * Transactionの開始
   * @returns void
   */
  transaction(): void;

  /**
   * Commit実行（データベースの処理を確定する）
   * @returns void
   */
  commit(): void;

  /**
   * RollBack実行（データベースの処理をなかったコトにする）
   * @returns void
   */
  rollback(): void;
}
