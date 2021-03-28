import { ShopAccount } from '../../model/ShopAccount';
import { Result } from '../../utils/types/Result';

export interface IShopAccountService {
  getAll(): Promise<Result<ShopAccount[]>>;

  getByID(id: number): Promise<Result<ShopAccount>>;

  create(shopAccount: ShopAccount): Promise<Result<number>>;

  update(id: number, shopAccount: ShopAccount): Promise<Result<ShopAccount>>;

  delete(id: number): Promise<Result>;
}
