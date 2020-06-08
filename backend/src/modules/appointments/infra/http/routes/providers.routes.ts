import { Router } from 'express';

// Middlewares
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// Controllers
import ProvidersController from '../controllers/ProvidersController';

// inicialize
const providersRouter = Router();
const providersController = new ProvidersController();

/* apply middleware */
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
