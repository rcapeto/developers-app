import { DevelopersInCacheRepository } from '@test/in-cache-database/developers-in-cache-repository';
import { DeveloperUpdateGithubUsecase } from './developer-update-github-usecase';

const repository = new DevelopersInCacheRepository();
const usecase = new DeveloperUpdateGithubUsecase(repository);

describe('Get Developer', () => {
  it('should be able to get a developer from database', async () => {
    const developerId = '0001';
    const github = 'testgit';

    const response = await usecase.execute({ developerId, github });

    expect(response.github).toEqual(github);
  });
});
