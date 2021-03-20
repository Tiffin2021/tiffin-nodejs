import { Request, Response, Router } from 'express';
import { IShopInfoService } from '../service/interfaces/IShopInfoService';

export class ShopInfoController {
  public router: Router;
  private service: IShopInfoService;

  constructor(service: IShopInfoService) {
    this.router = Router();
    this.service = service;

    this.router.get('/shop_info', async (req: Request, res: Response) => {
      const shopInfo = await this.service.getAll().catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
      res.json(shopInfo);
    });

    this.router.get('/shop_info/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const shopInfo = await this.service.getByID(id).catch((err) => {
        res.status(500).send(err);
        return;
      });
      res.json(shopInfo);
    });

    this.router.put('/shop_info/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const shopInfo = req.body;
      await this.service.update(id, shopInfo).catch((err) => {
        res.status(500).send(err);
        return;
      });

      res.status(200).send();
    });
  }
}
