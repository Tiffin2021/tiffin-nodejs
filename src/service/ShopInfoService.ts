import { ShopInfo } from '../model/ShopInfo';
import { IShopInfoRepository } from '../repository/interfaces/IShopInfoRepository';
import { IShopInfoService } from './interfaces/IShopInfoService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { DatabaseErrorMessages } from '../utils/database';
import { Result } from '../utils/types/Result';

export class ShopInfoService implements IShopInfoService {
  private repository: IShopInfoRepository;

  constructor(repository: IShopInfoRepository) {
    this.repository = repository;
  }
  async getAll(): Promise<Result<ShopInfo[]>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<ShopInfo[]> = {};

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

    result.statusCode = HttpStatusCode.OK;
    result.value = getAllResult.value;
    return result;
  }
  async getByID(id: number): Promise<Result<ShopInfo>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<ShopInfo> = {};

    // 店舗アカウント情報を取得する
    const getAllResult = await this.repository.getByID(id);
    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (getAllResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = getAllResult.error;
      console.log(result.error);
      return result;
    }
    result.statusCode = HttpStatusCode.OK;
    result.value = getAllResult.value;
    return result;
  }
  async create(shopInfo: ShopInfo): Promise<Result<number>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<number> = {};

    // 店舗アカウント情報を取得する
    const getAllResult = await this.repository.create(shopInfo);
    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (getAllResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = getAllResult.error;
      console.log(result.error);
      return result;
    }
    result.statusCode = HttpStatusCode.Created;
    result.value = getAllResult.value;
    return result;
  }
  async update(id: number, shopInfo: ShopInfo): Promise<Result<ShopInfo>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<ShopInfo> = {};

    // 店舗アカウント情報を更新する
    const updateResult = await this.repository.update(id, shopInfo);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (updateResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = updateResult.error;
      console.log(result.error);
      return result;
    }

    // 更新後のデータを結果に詰めて返却
    result.value = shopInfo;
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
