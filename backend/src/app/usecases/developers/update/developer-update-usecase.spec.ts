import { ErrorMessage } from '@application/model/error';
import { DevelopersInCacheRepository } from '@test/in-cache-database/developers-in-cache-repository';
import { UpdateDeveloperUsecase } from './developer-update-usecase';

const repository = new DevelopersInCacheRepository();
const usecase = new UpdateDeveloperUsecase(repository);

describe('Get Developer', () => {
  it('should be able to update a developer from database', async () => {
    const developerId = '0001';
    const developerName = 'John Doe';

    const developer = await usecase.execute({
      developerId,
      params: { name: developerName },
    });

    expect(developer).toBeTruthy();
    expect(developer?.name).toBe(developerName);
  });
  it('should not be able to update a developer from database', async () => {
    const developerId = 'xxx';

    expect(() => usecase.execute({ developerId })).rejects.toBe(ErrorMessage);
  });
});
