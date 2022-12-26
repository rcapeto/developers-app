import { DevelopersInCacheRepository } from '@test/in-cache-database/developers-in-cache-repository';
import { FindOneDeveloperUsecase } from './find-one-developer-usecase';

const repository = new DevelopersInCacheRepository();
const usecase = new FindOneDeveloperUsecase(repository);

describe('Get Developer', () => {
  it('should be able to get a developer from database', async () => {
    const developerId = '0001';

    const developer = await usecase.execute({ developerId });

    expect(developer).toBeTruthy();
  });
  it('should not be able to get a developer from database', async () => {
    const developerId = 'xxx';

    const developer = await usecase.execute({ developerId });

    expect(developer).toBeNull();
  });
});
