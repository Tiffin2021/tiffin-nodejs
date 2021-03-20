import { ShopInfo } from '../model/ShopInfo';
import { IShopInfoRepository } from '../repository/interfaces/IShopInfoRepository';
import { IShopInfoService } from './interfaces/IShopInfoService';

export class ShopInfoService implements IShopInfoService {
  private repository: IShopInfoRepository;

  constructor(repository: IShopInfoRepository) {
    this.repository = repository;
  }
  async getAll(): Promise<ShopInfo[]> {
    return await this.repository.getAll();
  }
  async getByID(id: number): Promise<ShopInfo> {
    return await this.repository.getByID(id);
  }
  async create(shopInfo: ShopInfo): Promise<number> {
    return await this.repository.create(shopInfo);
  }
  async update(id: number, shopInfo: ShopInfo): Promise<ShopInfo> {
    return await this.repository.update(id, shopInfo);
  }
  async delete(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}
