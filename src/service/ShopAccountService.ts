import { ShopAccount } from '../model/ShopAccount';
import { IShopAccountRepository } from '../repository/interfaces/IShopAccountRepository';
import { IShopAccountService } from './interfaces/IShopAccountService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { DatabaseErrorMessages } from '../utils/database';
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
    const getAllResult = await this.repository.getAll();

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (getAllResult.error != null) {
      // 複数件取得の場合、1件も取得できなかったときもエラーとはせず、空のレスポンスを返却
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = getAllResult.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (getAllResult.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗アカウント情報の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 店舗アカウント情報を結果に詰め込んで返却
    result.value = getAllResult.value;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async getByID(id: number): Promise<Result<ShopAccount>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<ShopAccount> = {};

    // 店舗アカウント情報を取得する
    const getByIDResult = await this.repository.getByID(id);

    // Repositoryでエラーがあった場合
    if (getByIDResult.error != null) {
      // データが1件も取れていないエラーの場合、404ステータスを設定
      if (getByIDResult.error.message === DatabaseErrorMessages.NoData) {
        result.statusCode = HttpStatusCode.NotFound;
        result.error = getByIDResult.error;
        console.log(result.error);
        return result;
      }
      // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = getByIDResult.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (getByIDResult.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗アカウント情報の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 店舗アカウント情報を結果に詰め込んで返却
    result.value = getByIDResult.value;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async create(shopAccount: ShopAccount): Promise<Result<number>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<number> = {};

    // 店舗アカウント情報を作成する
    const createdResult = await this.repository.create(shopAccount);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (createdResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = createdResult.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (createdResult.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗アカウントIDの取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 作成後IDを返却
    result.value = createdResult.value;
    result.statusCode = HttpStatusCode.Created;
    return result;
  }

  async update(id: number, shopAccount: ShopAccount): Promise<Result<ShopAccount>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<ShopAccount> = {};

    // 店舗アカウント情報を更新する
    const shopAccounts = await this.repository.update(id, shopAccount);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (shopAccounts.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = shopAccounts.error;
      console.log(result.error);
      return result;
    }

    // 更新後のデータを結果に詰めて返却
    result.value = shopAccount;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async delete(id: number): Promise<Result> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result = {};

    // 店舗アカウント情報を削除する
    const deleteResult = await this.repository.delete(id);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (deleteResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = deleteResult.error;
      console.log(result.error);
      return result;
    }

    // 結果のボディは必要ないのでステータスのみ返却
    result.statusCode = HttpStatusCode.NoContent;
    return result;
  }
}
