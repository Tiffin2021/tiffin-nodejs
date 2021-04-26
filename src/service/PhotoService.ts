import { Photo } from '../model/Photo';
import { IPhotoRepository } from '../repository/interfaces/IPhotoRepository';
import { IPhotoService } from './interfaces/IPhotoService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { DatabaseErrorMessages } from '../utils/database';
import { Result } from '../utils/types/Result';
import { Buffer } from 'buffer';
import * as fs from 'fs';

export class PhotoService implements IPhotoService {
  private repository: IPhotoRepository;

  constructor(repository: IPhotoRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<Result<Photo[]>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<Photo[]> = {};

    // 画像を取得する
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
    const getAllResult = await this.repository.getByShopInfoID(shopInfoID);

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
      result.error = new Error('画像の取得に失敗しました。');
      console.log(result.error);
      return result;
    }

    // 画像を結果に詰め込んで返却
    result.value = getByIDResult.value;
    result.statusCode = HttpStatusCode.OK;
    return result;
  }

  async create(photo: Photo): Promise<Result<number>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<number> = {};

    // TODO: 画像データの箇所のテストのために、データ登録は一旦コメントアウトしておく

    //#region Photoデータ登録処理

    // 画像を作成する
    // const createdResult = await this.repository.create(photo);

    // // Repositoryでエラーがあった場合、500エラーコードとエラー内容を返却
    // if (createdResult.error != null) {
    //   result.statusCode = HttpStatusCode.InternalServerError;
    //   result.error = createdResult.error;
    //   console.log(result.error);
    //   return result;
    // }
    // // エラーは出てないが、中身がnullの場合、500エラーコードとエラー内容を返却
    // if (createdResult.value == null) {
    //   result.statusCode = HttpStatusCode.InternalServerError;
    //   result.error = new Error('画像IDの取得に失敗しました。');
    //   console.log(result.error);
    //   return result;
    // }

    //#endregion

    // base64が設定されていない場合、エラー
    if (photo.base64Image == null) {
      result.statusCode = HttpStatusCode.BadRequest;
      result.error = new Error('画像データが取得できませんでした。');
      console.log(result.error);
      return result;
    }

    // Base64文字列
    const base64 = photo.base64Image;

    // Base64からファイルの中身を取り出す
    const fileData = base64.replace(/^data:\w+\/\w+;base64,/, '');

    // Base64をデコードしファイルの実体をメモリに確保する（バッファする）
    const decodedFile = Buffer.from(fileData, 'base64');

    // 拡張子を取得
    const extension = base64.toString().slice(base64.indexOf('/') + 1, base64.indexOf(';'));

    // 現在日時(UnixTime)をファイル名にする
    const now = Date.now().toString();

    // src/public/imagesに画像データを書き込む
    fs.writeFile(`src/public/images/${now}.${extension}`, decodedFile, (err) => {
      // ファイル書き込みに失敗した場合、エラー
      if (err) {
        result.statusCode = HttpStatusCode.InternalServerError;
        result.error = new Error('画像データのアップロードに失敗しました。');
        console.log(result.error);
        return result;
      }
    });

    // 作成後IDを返却()
    result.value = 999;
    result.statusCode = HttpStatusCode.Created;
    return result;
  }

  async update(id: number, photo: Photo): Promise<Result<Photo>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<Photo> = {};

    // 画像を更新する
    const photos = await this.repository.update(id, photo);

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
