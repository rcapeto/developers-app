import { ErrorMessage } from '@app/views/error';
import { makeUser } from '@test/factory/user';
import { UsersInCacheRepository } from '@test/repositories/users-in-cache-repository';
import { CreateUserUsecase } from './create-user-usecase';

describe('Create User', () => {
  it('should be able to create user', async () => {
    const repository = new UsersInCacheRepository();
    const usecase = new CreateUserUsecase(repository);

    const user = makeUser();

    await usecase.execute(user);

    expect(repository.users).toHaveLength(1);
  });

  it('should not be able to create user', async () => {
    const repository = new UsersInCacheRepository();
    const usecase = new CreateUserUsecase(repository);

    const user = makeUser({ email: 'teste ' });

    expect(() => {
      return usecase.execute(user);
    }).rejects.toBe(ErrorMessage);
  });
});
