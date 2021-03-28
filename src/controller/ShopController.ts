import { Request, Response, Router } from 'express';
import { ShopAccount } from '../model/ShopAccount';
import { ShopInfo } from '../model/ShopInfo';
import { IShopService } from '../service/interfaces/IShopService';
import { ShopService } from '../service/ShopService';

export class ShopController {
  public router: Router;
  private shopService: IShopService;

  constructor(shopService: ShopService) {
    this.router = Router();
    this.shopService = shopService;

    // ShopAccountと紐付いたShopInfoを1件を作成する
    this.router.post('/shop', async (req: Request, res: Response) => {
      const shopAccount: ShopAccount = req.body.shopAccount;
      const shopInfo: ShopInfo = req.body.shopInfo;

      const result = await this.shopService.create(shopAccount, shopInfo);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });
  }
}
