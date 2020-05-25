import { Router } from 'express';

// Middlewares
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// Controllers
import AppointmentsController from '../controllers/AppointmentsController';

// inicialize
const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

/* apply middleware */
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
