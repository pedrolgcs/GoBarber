// Shared
// import AppError from '@shared/errors/AppError';

// Fakes
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

// Services
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvider = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const peter = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    const spider = await fakeUsersRepository.create({
      name: 'Spider',
      email: 'spider@gmail.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jana',
      email: 'jana@gmail.com',
      password: '123123',
    });

    const providers = await listProvider.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([peter, spider]);
  });
});
