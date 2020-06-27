import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import ListProvidersMonthAvailability from '@modules/appointments/services/ListProvidersMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month } = request.body;

    const listProvidersMonthAvailability = container.resolve(
      ListProvidersMonthAvailability,
    );

    const availability = await listProvidersMonthAvailability.execute({
      provider_id,
      year,
      month,
    });

    return response.status(200).json(availability);
  }
}

export default ProviderMonthAvailabilityController;
