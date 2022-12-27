import { PublicationsInCacheRepository } from '@test/in-cache-database/publications-in-cache-repository';
import { CreatePublicationsUsecase } from './create-publication-usecase';

const repository = new PublicationsInCacheRepository();
const usecase = new CreatePublicationsUsecase(repository);

describe('Create publication', () => {
  it('should be able to create a publication', async () => {
    const developerId = `dev-id-1`;
    const thumbnail = 'image';
    const title = 'Publication title';
    const description = 'Publication description';

    expect(() => {
      return usecase.execute({ developerId, title, description, thumbnail });
    }).resolves;
  });
});
