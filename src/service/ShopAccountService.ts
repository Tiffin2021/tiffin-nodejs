import { ShopAccount } from '../model/ShopAccount';
import { IShopAccountRepository } from '../repository/interfaces/IShopAccountRepository';
import { IShopAccountService } from './interfaces/IShopAccountService';

export class ShopAccountService implements IShopAccountService {
  private repository: IShopAccountRepository;

  constructor(repository: IShopAccountRepository) {
    this.repository = repository;
  }
  async getAll(): Promise<ShopAccount[]> {
    const result = await this.repository.getAll();
    if (result.error != null) return [];
    if (result.value == null) {
      return [];
    }
    return result.value;
  }
  async getByID(id: number): Promise<ShopAccount> {
    const result = await this.repository.getByID(id);
    return result.value!;
  }
  async create(shopAccount: ShopAccount): Promise<number> {
    const result = await this.repository.create(shopAccount);
    return result.value!;
  }
  async update(id: number, shopAccount: ShopAccount): Promise<ShopAccount> {
    const result = await this.repository.update(id, shopAccount);
    return result.value!;
  }
  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    return result.value!;
  }
}
