import { Request, Response, Router } from 'express';
import { ShopAccount } from '../model/ShopAccount';
import { ShopInfo } from '../model/ShopInfo';
import { IShopAccountService } from '../service/interfaces/IShopAccountService';
import { IShopInfoService } from '../service/interfaces/IShopInfoService';

export class ShopController {
  public router: Router;
  private shopAccountService: IShopAccountService;
  private shopInfoService: IShopInfoService;

  constructor(shopAccountService: IShopAccountService, shopInfoService: IShopInfoService) {
    this.router = Router();
    this.shopAccountService = shopAccountService;
    this.shopInfoService = shopInfoService;

    //shopAccountを1件を作成する
    this.router.post('/shop', async (req: Request, res: Response) => {
      const shopAccount: ShopAccount = req.body[0];
      const shopInfo: ShopInfo = req.body[1];
      const result = await this.shopAccountService.create(shopAccount).catch((err) => {
        console.log(err);
        res.status(500).send(err);
        return;
      });
      if (result != null) {
        shopInfo.shop_accounts_id = result;
      }
      await this.shopInfoService.create(shopInfo).catch((err) => {
        console.log(err);
        res.status(500).send(err);
        return;
      });
      res.status(201);
    });
  }
}
