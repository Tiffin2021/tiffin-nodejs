import { Request, Response, Router } from 'express';
import { ShopAccount } from '../model/ShopAccount';
import { IShopAccountService } from '../service/interfaces/IShopAccountService';
import { HttpStatusCode } from '../utils/http/HttpStatusCode';

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
      res.status(HttpStatusCode.OK).json(result.value);
    });

    this.router.get('/shop_accounts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.service.getByID(id);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(HttpStatusCode.OK).json(result.value);
    });

    this.router.post('/shop_accounts', async (req: Request, res: Response) => {
      const shopAccount = req.body as ShopAccount;
      const result = await this.service.create(shopAccount);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(HttpStatusCode.Created).json(result.value);
    });

    this.router.put('/shop_accounts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const shopAccount = req.body as ShopAccount;
      const result = await this.service.update(id, shopAccount);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(HttpStatusCode.OK).send();
    });

    this.router.delete('/shop_accounts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.service.delete(id);
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(HttpStatusCode.NoContent).send();
    });
  }
}
