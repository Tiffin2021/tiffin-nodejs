import { Request, Response, Router } from 'express';
import { Genre } from '../model/Genre';
import { IGenreService } from '../service/interfaces/IGenreService';

export class GenreController {
  public router: Router;
  private service: IGenreService;

  constructor(service: IGenreService) {
    this.router = Router();
    this.service = service;

    this.router.get('/genres', async (req: Request, res: Response) => {
      const result = await this.service.getAll();
      if (result.error != null) {
        res.status(result.statusCode!).json(result.error.message);
        return;
      }
      res.status(result.statusCode!).json(result.value);
    });
  }
}
