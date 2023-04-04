import client from '@config/prisma';
import { ErrorMessage } from '@application/model/error';
import {
  AllDeveloperPublicationsParams,
  CreatePublicationParams,
  GetPublicationsParams,
  GetPublicationsResponse,
  PublicationsRepository,
  UpdatePublicationParams,
} from '@application/repositories/publications-repository';
import { PublicationBackend } from '@application/model/publication';

export class PublicationsPrismaRepository implements PublicationsRepository {
  async create(params: CreatePublicationParams): Promise<void> {
    try {
      await client.publications.create({
        data: {
          description: params.description,
          thumbnail: params.thumbnail ?? '',
          title: params.title,
          developerId: params.developerId,
        },
      });
    } catch (err) {
      if (err instanceof ErrorMessage) {
        throw err;
      }
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }

  async delete(developerId: string, publicationId: string): Promise<void> {
    try {
      const publication = await this.findOne(publicationId);

      if (!publication) {
        throw new ErrorMessage('Not found publication with this ID', 'error');
      }

      if (publication.developerId !== developerId) {
        throw new ErrorMessage(
          `You can't delete something that isn't yours`,
          'unauthorized',
        );
      }

      await client.publications.delete({
        where: {
          id: publication.id,
        },
      });
    } catch (err) {
      if (err instanceof ErrorMessage) {
        throw err;
      }
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }

  async update(params: UpdatePublicationParams): Promise<PublicationBackend> {
    const { description, developerId, publicationId, title, thumbnail } =
      params;

    const hasThumbnail = thumbnail && thumbnail.length > 0;

    try {
      const publication = await this.findOne(publicationId);

      if (!publication) {
        throw new ErrorMessage('Not found publication with this ID', 'error');
      }

      if (publication.developerId !== developerId) {
        throw new ErrorMessage(
          `You can't delete something that isn't yours`,
          'unauthorized',
        );
      }

      const updatedPublication = (await client.publications.update({
        where: {
          id: publication.id,
        },
        data: {
          title: title ?? publication.title,
          editAt: new Date(),
          description: description ?? publication.description,
          thumbnail: hasThumbnail ? thumbnail : publication.thumbnail,
        },
        include: {
          developer: {
            select: {
              name: true,
              avatar_url: true,
              github: true,
              username: true,
            },
          },
          comments: true,
          likes: true,
        },
      })) as PublicationBackend;

      return updatedPublication;
    } catch (err) {
      if (err instanceof ErrorMessage) {
        throw err;
      }
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }

  async findOne(publicationId: string): Promise<PublicationBackend> {
    try {
      const publication = await client.publications.findUnique({
        where: {
          id: publicationId,
        },
        include: {
          developer: {
            select: {
              name: true,
              avatar_url: true,
              github: true,
            },
          },
          comments: true,
          likes: true,
        },
      });

      return publication as PublicationBackend;
    } catch (err) {
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }

  async allDeveloperPublications(
    developerId: string,
    params?: AllDeveloperPublicationsParams | undefined,
  ): Promise<GetPublicationsResponse> {
    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 10;

    try {
      const count = await this.countDeveloperPublications(developerId);

      const publications = (await client.publications.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          developerId,
        },
        include: {
          developer: {
            select: {
              name: true,
              avatar_url: true,
              github: true,
            },
          },
          comments: true,
          likes: true,
        },
      })) as PublicationBackend[];

      return {
        page,
        perPage,
        count,
        totalPages: Math.ceil(count / perPage),
        publications: publications,
      };
    } catch (err) {
      if (err instanceof ErrorMessage) {
        throw err;
      }
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }
  async all(
    params?: GetPublicationsParams | undefined,
  ): Promise<GetPublicationsResponse> {
    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 10;
    const search = params?.search ?? '';

    try {
      const count = await this.countPublications();

      const publications = (await client.publications.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        select: {
          comments: true,
          createdAt: true,
          description: true,
          id: true,
          likes: true,
          developer: {
            select: {
              avatar_url: true,
              name: true,
              github: true,
            },
          },
          editAt: true,
          title: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
            {
              developer: {
                name: {
                  contains: search,
                },
              },
            },
          ],
        },
      })) as PublicationBackend[];

      return {
        publications: publications,
        page,
        perPage,
        totalPages: Math.ceil(count / perPage),
        count,
      };
    } catch (err) {
      if (err instanceof ErrorMessage) {
        throw err;
      }
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }

  async countPublications() {
    return await client.publications.count();
  }

  async countDeveloperPublications(developerId: string) {
    const count = await client.publications.count({
      where: {
        developerId,
      },
    });
    return count;
  }
}
