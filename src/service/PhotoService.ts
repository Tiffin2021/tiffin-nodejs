import { Photo } from '../model/Photo';
import { IPhotoRepository } from '../repository/interfaces/IPhotoRepository';
import { IPhotoService } from './interfaces/IPhotoService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { DatabaseErrorMessages } from '../utils/database';
import { Result } from '../utils/types/Result';
import { IShopInfoRepository } from '../repository/interfaces/IShopInfoRepository';
import { ShopInfoRepository } from '../repository/ShopInfoRepository';
import { dataImgPath, uploadImgPath } from '../utils/const/baseURL';
import fs from 'fs';

export class PhotoService implements IPhotoService {
  private photoRepository: IPhotoRepository;
  private shopInfoRepository: IShopInfoRepository;

  constructor(photoRepository: IPhotoRepository, shopInfoRepository: IShopInfoRepository) {
    this.photoRepository = photoRepository;
    this.shopInfoRepository = shopInfoRepository;
  }

  async getAll(): Promise<Result<Photo[]>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<Photo[]> = {};

    // 画像を取得する
    const getAllResult = await this.photoRepository.getAll();

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
      result.error = new Error('画像の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 画像を結果に詰め込んで返却
    result.value = getAllResult.value;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async getByShopInfoID(shopInfoID: number): Promise<Result<Photo[]>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<Photo[]> = {};

    // 店舗ごとの画像一覧を取得する
    const getAllResult = await this.photoRepository.getByShopInfoID(shopInfoID);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (getAllResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = getAllResult.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (getAllResult.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('画像の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 画像を結果に詰め込んで返却
    result.value = getAllResult.value;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async getByID(id: number): Promise<Result<Photo>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<Photo> = {};

    // 画像を取得する
    const getByIDResult = await this.photoRepository.getByID(id);

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
      result.error = new Error('画像の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 画像を結果に詰め込んで返却
    result.value = getByIDResult.value;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async create(shopAccountId: number, photo: Photo): Promise<Result<number>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<number> = {};
    //ここで画像ファイルのパスを決定しておく必要がある現在の値は(仮)
    photo.pass = dataImgPath + 'test.jpg';
    // 余分な部分を削る
    const imgDataString = photo.img.replace(/^data:\w+\/\w+;base64,/, '');
    // base64 デコード
    const img = Buffer.from(imgDataString, 'base64');
    // サーバーに保存する
    fs.writeFile(uploadImgPath + 'test.jpg', img, (err) => {
      if (err) throw err;
      console.log('正常に書き込みが完了しました');
    });

    // 店舗情報を1件取得する(現在の使用ではアカウントに対して店舗情報が1件取得でいるはずなので、、、)
    const shopInfoResult = await this.shopInfoRepository.getByID(shopAccountId);

    //エラー処理(店舗情報の取得に失敗した場合)
    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (shopInfoResult.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = shopInfoResult.error;
      console.log(result.error);
      return result;
    }
    // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    if (shopInfoResult.value == null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = new Error('店舗情報の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    //正しい処理(店舗情報の取得に成功した場合)
    //photoに店舗情報の値を格納する
    const shopInfo = shopInfoResult.value;
    photo.prefecture = shopInfo.prefecture;
    photo.area = shopInfo.area;
    photo.station = shopInfo.station;
    photo.opentime = shopInfo.opentime;
    photo.closetime = shopInfo.closetime;
    photo.shop_info_id = shopInfo.id;

    // 画像を追加する
    const createdResult = await this.photoRepository.create(photo);

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
      result.error = new Error('画像IDの取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 作成後IDを返却
    result.value = createdResult.value;
    result.statusCode = HttpStatusCode.Created;
    return result;
  }

  async update(id: number, photo: Photo): Promise<Result<Photo>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<Photo> = {};

    // 画像を更新する
    const photos = await this.photoRepository.update(id, photo);

    // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    if (photos.error != null) {
      result.statusCode = HttpStatusCode.InternalServerError;
      result.error = photos.error;
      console.log(result.error);
      return result;
    }

    // 更新後のデータを結果に詰めて返却
    result.value = photo;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async delete(id: number): Promise<Result> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result = {};

    // 画像を削除する
    const deleteResult = await this.photoRepository.delete(id);

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
