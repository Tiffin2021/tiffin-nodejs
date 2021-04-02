import { Request, Response, Router } from 'express';
import { ITimeMasterService } from '../service/interfaces/ITimeMasterService';

export class TimeMasterController {
  public router: Router;
  private service: ITimeMasterService;

  constructor(service: ITimeMasterService) {
    this.router = Router();
    this.service = service;

    this.router.get('/time_master', async (req: Request, res: Response) => {
      const result = await this.service.getAll();
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });
  }
}
