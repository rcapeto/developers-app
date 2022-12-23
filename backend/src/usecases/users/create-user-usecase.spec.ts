import { makeUser } from '@test/factory/user';
import { UsersInCacheRepository } from '@test/repositories/user-in-cache-repository';
import { CreateUserUsecase } from './create-user-usecase';

describe('Create User', () => {
  it('should be able to create user', async () => {
    const user = makeUser();

    const usersRepository = new UsersInCacheRepository();
    const createUserUsecase = new CreateUserUsecase(usersRepository);

    await createUserUsecase.execute(user);

    expect(usersRepository.users).toHaveLength(1);
  });

  it('should be not able to create user', async () => {
    const user = makeUser({ email: 'teste' });

    const usersRepository = new UsersInCacheRepository();
    const createUserUsecase = new CreateUserUsecase(usersRepository);

    expect(() => {
      return createUserUsecase.execute(user);
    }).rejects.toThrow(Error);
  });
});
