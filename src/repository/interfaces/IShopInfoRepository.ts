import { ShopInfo } from '../../model/ShopInfo';

// 店舗アカウントテーブルに対する操作の振る舞いを定義します。
export interface IShopInfoRepository {
  /**
   * 店舗アカウント情報一覧の取得
   * @returns 店舗アカウント情報一覧
   */
  getAll(): Promise<ShopInfo[]>;

  /**
   * 店舗アカウント情報をIDで1件取得
   * @param  {number} id 店舗アカウントID
   * @returns 店舗アカウント情報
   */
  getByID(id: number): Promise<ShopInfo>;

  /**
   * 店舗アカウント情報を1件作成
   * @param  {ShopInfo} shopInfo 店舗アカウント情報
   * @returns 店舗アカウントID
   */
  create(shopInfo: ShopInfo): Promise<number>;

  /**
   * 店舗アカウント情報を1件更新
   * @param  {number} id 店舗アカウントID
   * @param  {ShopInfo} shopInfo 店舗アカウント情報
   * @returns 店舗アカウント情報
   */
  update(id: number, shopInfo: ShopInfo): Promise<ShopInfo>;

  /**
   * 店舗アカウント情報を1件削除
   * @param  {number} id 店舗アカウントID
   */
  delete(id: number): Promise<void>;
}
