import { ShopAccount } from '../../model/ShopAccount';
import { ShopInfo } from '../../model/ShopInfo';

export interface IShopService {
  create(shopAccount: ShopAccount, shopInfo: ShopInfo): Promise<void>;
}
