import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Interfaces
import IChacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// entities
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  private appointmentsRepository: IAppointmentsRepository;
  private cacheProvider: IChacheProvider;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    cacheProvider: IChacheProvider,
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.cacheProvider = cacheProvider;
  }

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}-${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        { provider_id, day, month, year },
      );

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return classToClass(appointments);
  }
}

export default ListProviderAppointmentsService;
