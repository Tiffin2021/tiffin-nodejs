import { Photo } from '../../model/Photo';
import { Result } from '../../utils/types/Result';

export interface IPhotoService {
  getAll(): Promise<Result<Photo[]>>;

  getByShopAccountID(shopInfoID: number): Promise<Result<Photo[]>>;

  getByID(id: number): Promise<Result<Photo>>;

  create(shopAccountId: number, photo: Photo): Promise<Result<number>>;

  update(id: number, photo: Photo): Promise<Result<Photo>>;

  delete(id: number): Promise<Result>;
}
