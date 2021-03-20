import { Request, Response, Router } from 'express';
import { IShopInfoService } from '../service/interfaces/IShopInfoService';

export class ShopInfoController {
  public router: Router;
  private service: IShopInfoService;

  constructor(service: IShopInfoService) {
    this.router = Router();
    this.service = service;

    this.router.get('/', async (req: Request, res: Response) => {
      const shopInfos = await this.service.getAll().catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
      res.json(shopInfos);
    });
  }
}
