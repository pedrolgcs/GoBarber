import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

// Services
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

// Middlewares
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// inicialize
const appointmentsRouter = Router();

/* apply auth middleware for all routers */
appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (req, res) => {
  const appointments = await appointmentsRepository.find();
  return res.status(200).json(appointments);
}); */

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
