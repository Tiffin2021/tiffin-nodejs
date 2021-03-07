import { ShopAccount } from '../../model/ShopAccount';

export interface IShopAccountRepository {
  getAll(): Promise<ShopAccount[]>;
}