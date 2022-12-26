import { ErrorMessage } from '@application/model/error';
import { AccountInCacheRepository } from '@test/in-cache-database/account-in-cache-repository';
import { AccountLoginUsecase } from './login-usecase';

const repository = new AccountInCacheRepository();
const usecase = new AccountLoginUsecase(repository);
const developer = {
  confirm_password: '@test123',
  password: '@test123',
  name: 'John Doe',
  username: 'john doe',
};

describe('Account Login', () => {
  it('should be able to login in application', async () => {
    await repository.register(developer);

    const token = await usecase.execute(developer);

    expect(token).toBeTruthy();
  });

  it('should not be able to login in applcation', async () => {
    await repository.register(developer);

    expect(() => {
      return usecase.execute(developer);
    }).rejects.toBe(ErrorMessage);
  });
});
