import { injectable, inject } from 'tsyringe';

// Entities
import User from '@modules/users/infra/typeorm/entities/User';

// Interfaces
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    users.map(user => delete user.password);

    return users;
  }
}

export default ListProviderService;