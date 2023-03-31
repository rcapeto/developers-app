import { ErrorMessage } from '@application/model/error';
import { DevelopersInCacheRepository } from '@test/in-cache-database/developers-in-cache-repository';
import { DeleteDeveloperUsecase } from './delete-developer-usecase';

const repository = new DevelopersInCacheRepository();
const usecase = new DeleteDeveloperUsecase(repository);

describe('Delete Developer', () => {
  it('should be able to delete developer from database', async () => {
    const developerId = '0001';

    expect(() => {
      return usecase.execute({ developerId });
    }).resolves;
  });
  it('should not be able to delete developer from database', async () => {
    const developerId = 'xxx';

    expect(() => {
      return usecase.execute({ developerId });
    }).rejects.toBe(ErrorMessage);
  });
});
