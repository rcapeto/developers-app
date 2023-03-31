import { PublicationsInCacheRepository } from '@test/in-cache-database/publications-in-cache-repository';
import { AllDeveloperPublicationsUsecase } from './developer-publications-usecase';

const repository = new PublicationsInCacheRepository();
const usecase = new AllDeveloperPublicationsUsecase(repository);

describe('All developers publications', () => {
  it('should be able get all developer publications', async () => {
    const developerId = `dev-id-1`;

    const response = await usecase.execute({ developerId });

    expect(response.publications).toHaveLength(1);
    expect(response.publications).toEqual(expect.any(Array));
  });
});
