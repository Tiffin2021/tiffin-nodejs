import { ShopInfo } from '../../model/ShopInfo';

export interface IShopInfoService {
  getAll(): Promise<ShopInfo[]>;

  getByID(id: number): Promise<ShopInfo>;

  create(shopInfo: ShopInfo): Promise<number>;

  update(id: number, shopInfo: ShopInfo): Promise<ShopInfo>;

  delete(id: number): Promise<void>;
}
