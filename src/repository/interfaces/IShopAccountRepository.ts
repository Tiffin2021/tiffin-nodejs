import { ShopAccount } from '../../model/ShopAccount';

// 店舗アカウントテーブルに対する操作の振る舞いを定義します。
export interface IShopAccountRepository {
  /**
   * 店舗アカウント情報一覧の取得
   * @returns 店舗アカウント情報一覧
   */
  getAll(): Promise<ShopAccount[]>;

  /**
   * 店舗アカウント情報をIDで1件取得
   * @param  {number} id 店舗アカウントID
   * @returns 店舗アカウント情報
   */
  get(id: number): Promise<ShopAccount>;

  /**
   * 店舗アカウント情報を1件作成
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウントID
   */
  create(shopAccount: ShopAccount): Promise<number>;

  /**
   * 店舗アカウント情報を1件更新
   * @param  {number} id 店舗アカウントID
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウント情報
   */
  update(id: number, shopAccount: ShopAccount): Promise<ShopAccount>;

  /**
   * 店舗アカウント情報を1件削除
   * @param  {number} id 店舗アカウントID
   */
  delete(id: number): Promise<void>;
}
