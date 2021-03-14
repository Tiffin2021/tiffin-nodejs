import { ShopAccount } from '../model/ShopAccount';
import { IShopAccountRepository } from '../repository/interfaces/IShopAccountRepository';
import { IShopAccountService } from './interfaces/IShopAccountService';

export class ShopAccountService implements IShopAccountService {
  private repository: IShopAccountRepository;

  constructor(repository: IShopAccountRepository) {
    this.repository = repository;
  }
  async getAll(): Promise<ShopAccount[]> {
    return await this.repository.getAll();
  }
  async getByID(id: number): Promise<ShopAccount> {
    return await this.repository.getByID(id);
  }
  async create(shopAccount: ShopAccount): Promise<number> {
    return await this.repository.create(shopAccount);
  }
  async update(id: number, shopAccount: ShopAccount): Promise<ShopAccount> {
    return await this.repository.update(id, shopAccount);
  }
  async delete(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}
