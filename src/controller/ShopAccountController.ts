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

    this.router.get('/shop_accounts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const shopAccounts = await this.service.getByID(id).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
      res.json(shopAccounts);
    });

    this.router.post('/shop_accounts', async (req: Request, res: Response) => {
      const shopAccount = req.body as ShopAccount;
      const createdID = await this.service.create(shopAccount).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
      res.status(201).json(createdID);
    });

    this.router.put('/shop_accounts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const shopAccount = req.body as ShopAccount;
      await this.service.update(id, shopAccount).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
      res.status(200).send();
    });

    this.router.delete('/shop_accounts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const shopAccount = req.body as ShopAccount;
      await this.service.delete(id).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
      res.status(204).send();
    });
  }
}
