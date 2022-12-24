import { makeUser } from '@test/factory/user';
import { UsersInCacheRepository } from '@test/repositories/users-in-cache-repository';
import { AuthenticateLoginUsecase } from './login-usecase';

describe('Get all users', () => {
  it('should be able to get all database users', async () => {
    const repository = new UsersInCacheRepository();
    const usecase = new AuthenticateLoginUsecase(repository);

    const email = 'johndoe@teste.com';
    const user = makeUser({ email });

    await repository.create(user);
    const response = await usecase.execute({ email });

    expect(response?.email).toBe(email);
  });
});
