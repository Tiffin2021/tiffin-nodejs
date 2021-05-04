import { Request, Response, Router } from 'express';
import { Photo } from '../model/Photo';
import { IPhotoService } from '../service/interfaces/IPhotoService';

export class PhotoController {
  public router: Router;
  private service: IPhotoService;

  constructor(service: IPhotoService) {
    this.router = Router();
    this.service = service;

    //写真の全件取得
    this.router.get('/photos', async (req: Request, res: Response) => {
      const result = await this.service.getAll();
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    //店舗アカウント→店舗情報に紐づく写真の全件取得
    this.router.get('/photos/shopAccountId/:shopAccountId', async (req: Request, res: Response) => {
      const shopAccountId = parseInt(req.params.shopAccountId);
      const result = await this.service.getByShopAccountID(shopAccountId);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    //写真の一件取得
    this.router.get('/photos/id/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.service.getByID(id);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    //写真の追加
    this.router.post('/photos/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const photo = req.body as Photo;
      const result = await this.service.create(id, photo);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    //写真情報の変更(今回は実装しない)
    this.router.put('/photos/:id', async (req: Request, res: Response) => {
      // const id = parseInt(req.params.id);
      // const photo = req.body as Photo;
      // const result = await this.service.update(id, photo);
      // if (result.error != null) {
      //   res.status(result.statusCode!).json(result.error.message);
      //   return;
      // }
      // res.status(result.statusCode!).send();
    });

    //写真の削除
    this.router.delete('/photos/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.service.delete(id);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).send();
    });
  }
}
