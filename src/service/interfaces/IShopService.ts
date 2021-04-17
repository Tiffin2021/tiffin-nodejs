import { ShopAccount } from '../../model/ShopAccount';
import { ShopInfo } from '../../model/ShopInfo';
import { Result } from '../../utils/types/Result';

export interface IShopService {
  create(shopAccount: ShopAccount, shopInfo: ShopInfo): Promise<Result<number>>;

  delete(shopAccountId: number): Promise<Result>;
}
