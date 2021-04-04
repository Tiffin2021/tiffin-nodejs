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
      const result = await this.service.getAll();
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    this.router.get('/shop_accounts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.service.getByID(id);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    this.router.post('/shop_accounts', async (req: Request, res: Response) => {
      const shopAccount = req.body as ShopAccount;
      const result = await this.service.create(shopAccount);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });

    this.router.put('/shop_accounts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const shopAccount = req.body as ShopAccount;
      const result = await this.service.update(id, shopAccount);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).send();
    });

    this.router.delete('/shop_accounts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.service.delete(id);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).send();
    });

    this.router.get('/shop_accounts_login', async (req: Request, res: Response) => {
      if (req.query.email == null || req.query.pass == null) {
        res.status(400).send();
        return;
      }
      const email = req.query.email as string;
      const pass = req.query.pass as string;

      const result = await this.service.login(email, pass);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });
  }
}
