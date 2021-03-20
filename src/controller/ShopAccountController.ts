import { Request, Response, Router } from 'express';
import { IShopAccountService } from '../service/interfaces/IShopAccountService';

export class ShopAccountController {
  public router: Router;
  private service: IShopAccountService;

  constructor(service: IShopAccountService) {
    this.router = Router();
    this.service = service;

    this.router.get('/', async (req: Request, res: Response) => {
      const shopAccounts = await this.service.getAll().catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
      res.json(shopAccounts);
    });
  }
}
