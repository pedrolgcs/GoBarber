import { Router } from 'express';

// Controllers
import ProfileController from '../controllers/ProfileController';

// Middlewares
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Inicialize
const profileRouter = Router();
const profileController = new ProfileController();

/* apply auth middleware for all profile routes */
profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
