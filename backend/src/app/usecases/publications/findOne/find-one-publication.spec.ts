import { ErrorMessage } from '@application/model/error';
import { makePublication } from '@test/factory/publication';
import { PublicationsInCacheRepository } from '@test/in-cache-database/publications-in-cache-repository';
import { FindOnePublicationsUsecase } from './find-one-publication-usecase';

const repository = new PublicationsInCacheRepository();
const usecase = new FindOnePublicationsUsecase(repository);

describe('Get one publication', () => {
  it('should be able to get a publication', async () => {
    const publicationId = 'publication-example-id';

    const publication = makePublication({ id: publicationId });

    repository.push(publication);

    const data = await usecase.execute({ publicationId });

    expect(data.id).toEqual(publication.id);
  });

  it('should not be able to get a publication', async () => {
    const publicationId = 'publication-example-id';

    const publication = makePublication({ id: publicationId });
    repository.push(publication);

    expect(() => {
      return usecase.execute({ publicationId: 'id' });
    }).rejects.toBe(ErrorMessage);
  });
});
