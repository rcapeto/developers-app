import { randomUUID } from 'node:crypto';
import { PublicationBackend } from '@application/model/publication';
import {
  GetPublicationsParams,
  GetPublicationsResponse,
  PublicationsRepository,
} from '@application/repositories/publications-repository';
import { RenderPublication } from '@application/view/publications';
import { makeDeveloper } from '@test/factory/developer';

export class PublicationsInCacheRepository implements PublicationsRepository {
  private publications: PublicationBackend[] = [];

  constructor() {
    this.populateDatabase();
  }

  async all(
    params?: GetPublicationsParams | undefined,
  ): Promise<GetPublicationsResponse> {
    const perPage = params?.perPage ?? 10;
    const page = params?.page ?? 1;

    const start = (page - 1) * perPage;
    const end = perPage * page;

    const publications = this.publications.slice(start, end);

    return {
      publications: RenderPublication.many(publications),
      perPage,
      page,
      totalPages: Math.ceil(this.publications.length / perPage),
      count: this.publications.length,
    };
  }

  async populateDatabase() {
    for (let i = 1; i <= 20; i++) {
      this.publications.push({
        comments: [],
        createdAt: new Date(),
        description: 'Description',
        developer: makeDeveloper({ id: `dev-id-${i}` }),
        developerId: `dev-id-${i}`,
        id: randomUUID(),
        likes: [],
        thumbnail: '',
        title: 'Title',
      });
    }
  }
}
