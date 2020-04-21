import { Router } from 'express';

// Routes
import appointmentRouter from './appointments.routes';

// Inicialize Router
const routes = Router();

routes.use('/appointments', appointmentRouter);

export default routes;
