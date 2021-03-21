import { ShopAccount } from '../model/ShopAccount';
import { ShopInfo } from '../model/ShopInfo';
import { IShopAccountRepository } from '../repository/interfaces/IShopAccountRepository';
import { IShopInfoRepository } from '../repository/interfaces/IShopInfoRepository';
import { IShopService } from './interfaces/IShopService';

export class ShopService implements IShopService {
  private shopAccountRepository: IShopAccountRepository;
  private shopInfoRepository: IShopInfoRepository;

  constructor(
    shopAccountRepository: IShopAccountRepository,
    shopInfoRepository: IShopInfoRepository
  ) {
    this.shopAccountRepository = shopAccountRepository;
    this.shopInfoRepository = shopInfoRepository;
  }

  async create(shopAccount: ShopAccount, shopInfo: ShopInfo): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const result = await this.shopAccountRepository.create(shopAccount).catch((err) => {
        return reject(err);
      });
      if (result == null) {
        return reject('予期せぬエラー');
      }
      shopInfo.shop_accounts_id = result;

      await this.shopInfoRepository.create(shopInfo).catch((err) => {
        return reject(err);
      });

      return resolve;
    });
  }
}
