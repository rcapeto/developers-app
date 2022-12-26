import { DevelopersInCacheRepository } from '@test/in-cache-database/developers-in-cache-repository';
import { AllDevelopersUsecase } from './all-developers-usecase';

const repository = new DevelopersInCacheRepository();
const usecase = new AllDevelopersUsecase(repository);

describe('All Developers', () => {
  it('Should be able to get all developers', async () => {
    const response = await usecase.execute();

    expect(response.developers.length).toBe(10);
    expect(response).toEqual(
      expect.objectContaining({
        perPage: 10,
        page: 1,
      }),
    );
  });
});
