import { ShopAccount } from '../../model/ShopAccount';

export interface IShopAccountService {
  getAll(): Promise<ShopAccount[]>;

  getLoginUser(shopAccount: ShopAccount): Promise<ShopAccount>;

  getByID(id: number): Promise<ShopAccount>;

  create(shopAccount: ShopAccount): Promise<number>;

  update(id: number, shopAccount: ShopAccount): Promise<ShopAccount>;

  delete(id: number): Promise<void>;
}
