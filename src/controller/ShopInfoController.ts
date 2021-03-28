import { Request, Response, Router } from 'express';
import { ShopInfo } from '../model/ShopInfo';
import { IShopInfoService } from '../service/interfaces/IShopInfoService';

export class ShopInfoController {
  public router: Router;
  private service: IShopInfoService;

  constructor(service: IShopInfoService) {
    this.router = Router();
    this.service = service;

    this.router.get('/shop_info', async (req: Request, res: Response) => {
      const result = await this.service.getAll();
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    this.router.get('/shop_info/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.service.getByID(id);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    this.router.put('/shop_info/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const shopInfo = req.body as ShopInfo;
      const result = await this.service.update(id, shopInfo);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).send();
    });
  }
}
