import { ShopAccount } from '../model/ShopAccount';
import { IShopAccountRepository } from '../repository/interfaces/IShopAccountRepository';
import { IShopAccountService } from './interfaces/IShopAccountService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { Result } from '../utils/types/Result';

export class ShopAccountService implements IShopAccountService {
  private repository: IShopAccountRepository;

  constructor(repository: IShopAccountRepository) {
    this.repository = repository;
  }
  async getAll(): Promise<Result<ShopAccount[]>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<ShopAccount[]> = {};

    // 店舗アカウント情報を取得する
    const shopAccounts = await this.repository.getAll();

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (shopAccounts.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = shopAccounts.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (shopAccounts.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗アカウント情報の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 店舗アカウント情報を結果に詰め込んで返却
    result.value = shopAccounts.value;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async getByID(id: number): Promise<Result<ShopAccount>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<ShopAccount> = {};

    // 店舗アカウント情報を取得する
    const shopAccounts = await this.repository.getByID(id);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (shopAccounts.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = shopAccounts.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (shopAccounts.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗アカウント情報の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 店舗アカウント情報を結果に詰め込んで返却
    result.value = shopAccounts.value;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }
  async create(shopAccount: ShopAccount): Promise<Result<number>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<number> = {};

    // 店舗アカウント情報を取得する
    const shopAccounts = await this.repository.create(shopAccount);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (shopAccounts.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = shopAccounts.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (shopAccounts.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗アカウント情報の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 作成後IDを返却
    result.value = shopAccounts.value;
    result.statusCode = HttpStatusCode.Created;
    return result;
  }

  async update(id: number, shopAccount: ShopAccount): Promise<Result<ShopAccount>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<ShopAccount> = {};

    // 店舗アカウント情報を取得する
    const shopAccounts = await this.repository.update(id, shopAccount);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (shopAccounts.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = shopAccounts.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (shopAccounts.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗アカウント情報の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 更新後のデータを結果に詰めて返却
    result.value = shopAccounts.value;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async delete(id: number): Promise<Result> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result = {};

    // 店舗アカウント情報を取得する
    const shopAccounts = await this.repository.delete(id);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (shopAccounts.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = shopAccounts.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (shopAccounts.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗アカウント情報の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 結果のボディは必要ないのでステータスのみ返却
    result.statusCode = HttpStatusCode.NoContent;
    return result;
  }
}
