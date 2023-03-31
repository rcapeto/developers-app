import { ErrorMessage } from '@application/model/error';
import { makePublication } from '@test/factory/publication';
import { PublicationsInCacheRepository } from '@test/in-cache-database/publications-in-cache-repository';
import { UpdatePublicationsUsecase } from './update-publication-usecase';

const repository = new PublicationsInCacheRepository();
const usecase = new UpdatePublicationsUsecase(repository);

describe('Update publication', () => {
  it('should be able to update a publication', async () => {
    const developerId = 'developer-example-id';
    const publicationId = 'publication-example-id';

    const publication = makePublication({ developerId, id: publicationId });

    repository.push(publication);

    const response = await usecase.execute({
      description: 'Description test',
      title: 'title test',
      developerId,
      publicationId,
    });

    expect(response).toBeTruthy();
    expect(response.title).toEqual(expect.any(String));
    expect(response.description).toEqual('Description test');
  });
  it('should not be able to update a publication, because is wrong developer', async () => {
    const developerId = 'developer-example-id';
    const publicationId = 'publication-example-id';

    const publication = makePublication({ developerId, id: publicationId });

    repository.push(publication);

    expect(() => {
      return usecase.execute({
        description: 'Description test',
        title: 'title test',
        developerId: 'developer-1',
        publicationId,
      });
    }).rejects.toEqual(ErrorMessage);
  });

  it('should not be able to update publication that does not exist', async () => {
    const developerId = 'developer-example-id';
    const publicationId = 'publication-example-id';

    const publication = makePublication({ developerId, id: publicationId });

    repository.push(publication);

    expect(() => {
      return usecase.execute({
        description: 'Description test',
        title: 'title test',
        developerId,
        publicationId: 'publication-id',
      });
    }).rejects.toEqual(ErrorMessage);
  });
});
