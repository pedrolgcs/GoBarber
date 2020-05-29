// Errors
import AppError from '@shared/errors/AppError';

// Repository
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

// Services
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeappointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeappointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1');
  });

  it('should not be able to create a tow appointment on the same time', async () => {
    const fakeappointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeappointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});