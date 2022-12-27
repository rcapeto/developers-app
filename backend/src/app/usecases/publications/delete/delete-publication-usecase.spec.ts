import { ErrorMessage } from '@application/model/error';
import { makePublication } from '@test/factory/publication';
import { PublicationsInCacheRepository } from '@test/in-cache-database/publications-in-cache-repository';
import { DeletePublicationsUsecase } from './delete-publication-usecase';

const repository = new PublicationsInCacheRepository();
const usecase = new DeletePublicationsUsecase(repository);

describe('Delete publication', () => {
  it('should be able to delete a publication', async () => {
    const developerId = 'developer-example-id';
    const publicationId = 'publication-example-id';

    const publication = makePublication({ developerId, id: publicationId });

    repository.push(publication);

    expect(() => {
      return usecase.execute({ developerId, publicationId });
    }).resolves;
  });

  it('should not be able to delete publication with wrong developerId', async () => {
    const developerId = 'developer-example-id';
    const publicationId = 'publication-example-id';

    const publication = makePublication({
      developerId: 'dev-1',
      id: publicationId,
    });

    repository.push(publication);

    expect(() => {
      return usecase.execute({ developerId, publicationId });
    }).rejects.toEqual(ErrorMessage);
  });

  it('should not be able to delete publication that does not exist', async () => {
    const developerId = 'developer-example-id';
    const publicationId = 'publication-example-id';

    const publication = makePublication({
      developerId,
      id: 'publication-1',
    });

    repository.push(publication);

    expect(() => {
      return usecase.execute({ developerId, publicationId });
    }).rejects.toEqual(ErrorMessage);
  });
});
