import { Request, Response, Router } from 'express';
import { ShopAccount } from '../model/ShopAccount';
import { IShopAccountService } from '../service/interfaces/IShopAccountService';

export class ShopAccountController {
  public router: Router;
  private service: IShopAccountService;

  constructor(service: IShopAccountService) {
    this.router = Router();
    this.service = service;

    this.router.get('/shop_accounts', async (req: Request, res: Response) => {
      const shopAccounts = await this.service.getAll().catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
      res.json(shopAccounts);
    });

    this.router.get('/shop_accounts/login', async (req: Request, res: Response) => {
      if (req.query.email == null || req.query.pass == null) {
        res.status(400).send();
        return;
      }
      const email = req.query.email as string;
      const pass = req.query.pass as string;
      const shopAccount: ShopAccount = {
        id: 0,
        email: email,
        pass: pass,
      };
      const loginShopAccount = await this.service.getLoginUser(shopAccount).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
      console.log(loginShopAccount);
      if (loginShopAccount == null) {
        res.status(403).send();
        return;
      }
      res.status(200).json(loginShopAccount.id);
    });
  }
}
