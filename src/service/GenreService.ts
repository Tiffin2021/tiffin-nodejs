import { Genre } from '../model/Genre';
import { IGenreRepository } from '../repository/interfaces/IGenreRepository';
import { IGenreService } from './interfaces/IGenreService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';
import { DatabaseErrorMessages } from '../utils/database';
import { Result } from '../utils/types/Result';

export class GenreService implements IGenreService {
  private repository: IGenreRepository;

  constructor(repository: IGenreRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<Result<Genre[]>> {
    // Controllerに返却するための結果オブジェクトを生成
    const result: Result<Genre[]> = {};

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
}
