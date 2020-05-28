import { container } from 'tsyringe';

// Users providers
import '@modules/users/providers';

// Providers global
import './providers';

// Appointmens
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// Tokens
// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
