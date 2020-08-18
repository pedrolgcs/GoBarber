import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ListProviderService from '@modules/appointments/services/ListProviderService';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProviders = container.resolve(ListProviderService);

    const providers = await listProviders.execute({
      user_id: request.user.id,
    });

    return response.json(classToClass(providers));
  }
}

export default ProvidersController;
