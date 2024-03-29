import { ErrorMessage } from '@application/model/error';
import { AccountInCacheRepository } from '@test/in-cache-database/account-in-cache-repository';
import { AccountRegisterUsecase } from './register-usecase';

const repository = new AccountInCacheRepository();
const usecase = new AccountRegisterUsecase(repository);

describe('Account Register', () => {
  it('should be able to create a new user', async () => {
    await usecase.execute({
      confirm_password: '@test123',
      password: '@test123',
      name: 'John Doe',
      username: 'johndoe',
    });

    expect(repository.getDevelopers()).toHaveLength(1);
  });

  it('should not be able to create user', async () => {
    expect(() => {
      return usecase.execute({
        confirm_password: '@test123',
        password: '@test123',
        name: 'John Doe',
        username: 'johndoe',
      });
    }).rejects.toBe(ErrorMessage);
  });
});
