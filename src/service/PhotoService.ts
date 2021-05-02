import { Photo } from '../model/Photo';
import { IPhotoRepository } from '../repository/interfaces/IPhotoRepository';
import { IPhotoService } from './interfaces/IPhotoService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { DatabaseErrorMessages } from '../utils/database';
import { Result } from '../utils/types/Result';
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

    // エンコードデータがNULLならエラー。
    const encodedData = photo.imgBase64;
    if (encodedData == null) {
      result.statusCode = HttpStatusCode.NoContent;
      result.error = new Error('画像がありません。');
      console.log(result.error);
      return result;
    }

    // エンコードデータからbase64を取り除く。
    const fileData = encodedData.replace(/^data:\w+\/\w+;base64,/, '');

    // base64の（image/ 以降）実態を取り出し、バッファする。
    // 書き込むデータイメージ
    // const decodedFile = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const decodedFile = Buffer.from(fileData, 'base64');
    console.log(decodedFile);

    // path作成
    const path = `src/public/images/file${photo.shop_info_id}.jpeg`;

    // ファイルに書き込み
    fs.writeFile(path, decodedFile, (err) => {
      if (err) throw err;
      console.log('正常に書き込みが完了しました');
    });

    // pathを格納
    photo.pass = path;

    // 画像を作成する
    const createdResult = await this.repository.create(photo);

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
