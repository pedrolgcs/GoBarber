// Shared
import AppError from '@shared/errors/AppError';

// Fakes
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

// Services
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('Peter');
    expect(profile.email).toBe('pedro@gmail.com');
  });

  it('should not be able to show the profile non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
