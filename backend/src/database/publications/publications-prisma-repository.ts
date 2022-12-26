import client from '@config/prisma';
import { ErrorMessage } from '@application/model/error';
import {
  AllDeveloperPublicationsParams,
  GetPublicationsParams,
  GetPublicationsResponse,
  PublicationsRepository,
} from '@application/repositories/publications-repository';
import { RenderPublication } from '@application/view/publications';
import { PublicationBackend } from '@application/model/publication';

export class PublicationsPrismaRepository implements PublicationsRepository {
  async allDeveloperPublications(
    developerId: string,
    params?: AllDeveloperPublicationsParams | undefined,
  ): Promise<GetPublicationsResponse> {
    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 10;

    try {
      const count = await this.countDeveloperPublications(developerId);

      const publications = await client.publications.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        where: {
          developerId,
        },
        include: {
          developer: {
            select: {
              name: true,
              avatar_url: true,
            },
          },
          comments: true,
          likes: true,
        },
      });

      return {
        page,
        perPage,
        count,
        totalPages: Math.ceil(count / perPage),
        publications: RenderPublication.many(
          publications as PublicationBackend[],
        ),
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

      const publications = await client.publications.findMany({
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
      });

      return {
        publications: RenderPublication.many(
          publications as PublicationBackend[],
        ),
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
