import { randomUUID } from 'node:crypto';
import { PublicationBackend } from '@application/model/publication';
import {
  AllDeveloperPublicationsParams,
  CreatePublicationParams,
  GetPublicationsParams,
  GetPublicationsResponse,
  PublicationsRepository,
  UpdatePublicationParams,
} from '@application/repositories/publications-repository';
import { makeDeveloper } from '@test/factory/developer';
import { ErrorMessage } from '@application/model/error';

export class PublicationsInCacheRepository implements PublicationsRepository {
  private publications: PublicationBackend[] = [];

  constructor() {
    this.populateDatabase();
  }

  async update(params: UpdatePublicationParams): Promise<PublicationBackend> {
    const { description, developerId, title, thumbnail, publicationId } =
      params;

    const publicationIndex = this.publications.findIndex(
      (publication) => publication.id === publicationId,
    );

    if (publicationIndex < 0) {
      throw new ErrorMessage('Not found publication with this ID', 'error');
    }

    const publication = this.publications[publicationIndex];

    if (publication.developerId !== developerId) {
      throw new ErrorMessage(
        `You can't delete something that isn't yours`,
        'unauthorized',
      );
    }

    publication.description = description;
    publication.title = title;
    publication.thumbnail = thumbnail ?? publication.thumbnail;

    return publication;
  }

  async findOne(publicationId: string): Promise<PublicationBackend> {
    const publication = this.publications.find(
      (publication) => publication.id === publicationId,
    );

    if (!publication) {
      throw new ErrorMessage('Not found publication with this ID', 'error');
    }

    return publication;
  }

  async create(params: CreatePublicationParams): Promise<void> {
    const developer = makeDeveloper({ id: params.developerId });

    this.publications.push({
      comments: [],
      createdAt: new Date(),
      description: params.description,
      developer,
      developerId: params.developerId,
      id: randomUUID(),
      likes: [],
      thumbnail: params.thumbnail ?? '',
      title: params.title,
    });
  }

  async delete(developerId: string, publicationId: string): Promise<void> {
    const publicationIndex = this.publications.findIndex(
      (publication) => publication.id === publicationId,
    );

    if (publicationIndex < 0) {
      throw new ErrorMessage('Not found publication with this ID', 'error');
    }

    const publication = this.publications[publicationIndex];

    if (publication.developerId !== developerId) {
      throw new ErrorMessage(
        `You can't delete something that isn't yours`,
        'unauthorized',
      );
    }

    this.publications.splice(publicationIndex, 1);
  }

  async allDeveloperPublications(
    developerId: string,
    params?: AllDeveloperPublicationsParams | undefined,
  ): Promise<GetPublicationsResponse> {
    const perPage = params?.perPage ?? 10;
    const page = params?.page ?? 1;

    const start = (page - 1) * perPage;
    const end = perPage * page;

    const publications = this.publications.filter(
      (publication) => publication.developerId === developerId,
    );

    const count = publications.length;

    return {
      publications: publications.slice(start, end),
      perPage,
      page,
      count,
      totalPages: count / perPage,
    };
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
      publications: publications,
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

  async push(publication: PublicationBackend) {
    this.publications.push(publication);
  }
}
