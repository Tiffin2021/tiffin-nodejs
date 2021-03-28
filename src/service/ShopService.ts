import { ShopAccount } from '../model/ShopAccount';
import { ShopInfo } from '../model/ShopInfo';
import { IShopAccountRepository } from '../repository/interfaces/IShopAccountRepository';
import { IShopInfoRepository } from '../repository/interfaces/IShopInfoRepository';
import { IShopService } from './interfaces/IShopService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { Result } from '../utils/types/Result';

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

  async create(shopAccount: ShopAccount, shopInfo: ShopInfo): Promise<Result<number>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<number> = {};

    // 店舗アカウント情報を作成する
    const shopAccountCreatedResult = await this.shopAccountRepository.create(shopAccount);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (shopAccountCreatedResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = shopAccountCreatedResult.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (shopAccountCreatedResult.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗アカウントIDの取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 店舗アカウントの作成後IDを取得して、店舗情報にセットする
    const shopAccountID = shopAccountCreatedResult.value;
    shopInfo.shop_accounts_id = shopAccountID;

    // 作成されたアカウントIDで店舗情報を登録
    const shopInfoCreatedResult = await this.shopInfoRepository.create(shopInfo);
    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (shopInfoCreatedResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = shopInfoCreatedResult.error;
      console.log(result.error);
      return result;
    }

    // 作成した店舗アカウントIDを返却する。
    result.statusCode = HttpStatusCode.Created;
    result.value = shopAccountID;
    return result;
  }
}
