import { Router } from 'express';

// Routes
import usersRouter from './users.routes';
import appointmentsRouter from './appointments.routes';

// Inicialize Router
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
