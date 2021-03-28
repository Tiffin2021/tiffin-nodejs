import { ShopAccount } from '../../model/ShopAccount';
import { DatabaseResult } from '../../utils/database/Database';

// 店舗アカウントテーブルに対する操作の振る舞いを定義します。
export interface IShopAccountRepository {
  /**
   * 店舗アカウント情報一覧の取得
   * @returns 店舗アカウント情報一覧
   */
  getAll(): Promise<DatabaseResult<ShopAccount[]>>;

  /**
   * ログインしたアカウント情報と一致した店舗アカウント情報を取得
   * @param  {ShopAccount} shopAccount 店舗アカウント
   * @returns 店舗アカウントと一致した
   */
  getLoginUser(shopAccount: ShopAccount): Promise<ShopAccount>;

  /**
   * 店舗アカウント情報をIDで1件取得
   * @param  {number} id 店舗アカウントID
   * @returns 店舗アカウント情報
   */
  getByID(id: number): Promise<DatabaseResult<ShopAccount>>;

  /**
   * 店舗アカウント情報を1件作成
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウントID
   */
  create(shopAccount: ShopAccount): Promise<DatabaseResult<number>>;

  /**
   * 店舗アカウント情報を1件更新
   * @param  {number} id 店舗アカウントID
   * @param  {ShopAccount} shopAccount 店舗アカウント情報
   * @returns 店舗アカウント情報
   */
  update(id: number, shopAccount: ShopAccount): Promise<DatabaseResult>;

  /**
   * 店舗アカウント情報を1件削除
   * @param  {number} id 店舗アカウントID
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
