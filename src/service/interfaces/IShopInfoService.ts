import { ShopInfo } from '../../model/ShopInfo';
import { Result } from '../../utils/types/Result';

export interface IShopInfoService {
  getAll(): Promise<Result<ShopInfo[]>>;

  getByID(id: number): Promise<Result<ShopInfo>>;

  create(shopInfo: ShopInfo): Promise<Result<number>>;

  update(id: number, shopInfo: ShopInfo): Promise<Result<ShopInfo>>;

  delete(id: number): Promise<Result>;
}
