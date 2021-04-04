import { Request, Response, Router } from 'express';
import { IStationMasterService } from '../service/interfaces/IStationMasterService';

export class StationMasterController {
  public router: Router;
  private service: IStationMasterService;

  constructor(service: IStationMasterService) {
    this.router = Router();
    this.service = service;

    this.router.get('/station_master', async (req: Request, res: Response) => {
      const result = await this.service.getAll();
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });
  }
}
