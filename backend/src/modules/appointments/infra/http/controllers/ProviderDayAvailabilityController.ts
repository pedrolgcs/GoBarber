import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import ProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.body;

    const listProvidersDayAvailability = container.resolve(
      ProviderDayAvailabilityService,
    );

    const availability = await listProvidersDayAvailability.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.status(200).json(availability);
  }
}

export default ProviderDayAvailabilityController;
