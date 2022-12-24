import { makeUser } from '@test/factory/user';
import { UsersInCacheRepository } from '@test/repositories/users-in-cache-repository';
import { FindManyUsersUsecase } from './find-many-users-usecase';

describe('Get all users', () => {
  it('should be able to get all database users', async () => {
    const repository = new UsersInCacheRepository();
    const usecase = new FindManyUsersUsecase(repository);

    for (let i = 0; i < 3; i++) {
      const user = makeUser({
        document: `0000000000${i}`,
      });

      await repository.create(user);
    }

    const response = await usecase.execute({ page: 10, perPage: 10 });

    expect(response.page).toBe(10);
    expect(response.perPage).toBe(10);
    expect(response.users).toHaveLength(3);
  });
});
