import { Request, Response, Router } from 'express';
import UserController from '../controller/userController';
import authMiddleware from '../utils/middleware';
import utils from '../utils/utils';

class UserRouter {

  public router: Router;
  public userRoutes: UserRouter;
  private authBefore;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.authBefore = authMiddleware.auth;
    this.routes();
  }

  public routes() {
    this.router.get('/', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.userController.findAll));
    this.router.get('/:username', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.userController.findOne));
    this.router.post('/', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.userController.create));
    this.router.put('/:username', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.userController.update));
    this.router.delete('/:username', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.userController.delete));
  }

}

this.userRoutes = new UserRouter();
this.userRoutes.routes();

export default this.userRoutes.router;