import { ShopInfo } from '../../model/ShopInfo';
import { DatabaseResult } from '../../utils/database/Database';

// 店舗アカウントテーブルに対する操作の振る舞いを定義します。
export interface IShopInfoRepository {
  /**
   * 店舗アカウント情報一覧の取得
   * @returns 店舗アカウント情報一覧
   */
  getAll(): Promise<DatabaseResult<ShopInfo[]>>;

  /**
   * 店舗アカウント情報をIDで1件取得
   * @param  {number} id 店舗アカウントID
   * @returns 店舗アカウント情報
   */
  getByID(id: number): Promise<DatabaseResult<ShopInfo>>;

  /**
   * 店舗アカウント情報を1件作成
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウントID
   */
  create(shopAccount: ShopInfo): Promise<DatabaseResult<number>>;

  /**
   * 店舗アカウント情報を1件更新
   * @param  {number} id 店舗アカウントID
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウント情報
   */
  update(id: number, shopAccount: ShopInfo): Promise<DatabaseResult>;

  /**
   * 店舗アカウント情報を1件削除
   * @param  {number} id 店舗アカウントID
   */
  delete(id: number): Promise<DatabaseResult>;
}
