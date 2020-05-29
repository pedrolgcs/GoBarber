import { Router } from 'express';

// Routes
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';

// Inicialize Router
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/password', passwordRoutes);

export default routes;
