import { Request, Response, Router } from 'express';
import { Photo } from '../model/Photo';
import { IPhotoService } from '../service/interfaces/IPhotoService';
import * as fs from 'fs';

export class PhotoController {
  public router: Router;
  private service: IPhotoService;

  constructor(service: IPhotoService) {
    this.router = Router();
    this.service = service;

    this.router.get('/photos', async (req: Request, res: Response) => {
      const result = await this.service.getAll();
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    this.router.get('/photos/shopInfoID/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.service.getByShopInfoID(id);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    this.router.get('/photos/id/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.service.getByID(id);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    this.router.post('/photos/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const photo = req.body as Photo;
      //ここで画像ファイルのパスを決定しておく必要がある現在の値は(仮)
      photo.pass = 'http://localhost:4000/images/testDirectory/a.txt';
      const result = await this.service.create(id, photo);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      console.log(photo.img);
      //ファイルの書き込みwriteFileSync(ファイルのパス, 書き込む中身);
      // fs.writeFileSync(photo.pass, '1');
      // res.status(result.statusCode!).json(result.value);
    });

    this.router.put('/photos/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const photo = req.body as Photo;
      const result = await this.service.update(id, photo);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).send();
    });

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
