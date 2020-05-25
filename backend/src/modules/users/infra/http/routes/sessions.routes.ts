import { Router } from 'express';

// Controllers
import SessionsController from '../controllers/SessionsController';

// Inicialize
const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
