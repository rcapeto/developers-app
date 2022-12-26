import { PublicationsInCacheRepository } from '@test/in-cache-database/publications-in-cache-repository';
import { AllPublicationsUsecase } from './all-publications-usecase';

const repository = new PublicationsInCacheRepository();
const usecase = new AllPublicationsUsecase(repository);

describe('All Publications', () => {
  it('should be able get all publications', async () => {
    const response = await usecase.execute();

    expect(response.publications).toEqual(expect.any(Array));
    expect(response.publications).toHaveLength(10);
  });
});
