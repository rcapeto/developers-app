import client from '@config/prisma';
import { ErrorMessage } from '@application/model/error';
import {
  DevelopersRepository,
  GetDevelopersParams,
  GetDevelopersResponse,
  UpdateDeveloperParams,
} from '@application/repositories/developers-repository';
import { DeveloperBackend } from '@application/model/developer';
import { Password } from '@utils/password';

export class DevelopersPrismaRepository implements DevelopersRepository {
  async all(params?: GetDevelopersParams): Promise<GetDevelopersResponse> {
    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 10;
    const search = params?.search ?? '';

    try {
      const count = await this.countDevelopers();

      const developers = (await client.developers.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              techs: {
                contains: search,
              },
            },
            {
              github: {
                contains: search,
              },
            },
            {
              username: {
                contains: search,
              },
            },
          ],
        },
      })) as DeveloperBackend[];

      return {
        developers,
        page,
        perPage,
        totalPages: Math.ceil(count / perPage),
        count,
      };
    } catch (err) {
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }

  async findOne(developerId: string): Promise<DeveloperBackend | null> {
    const developer = (await client.developers.findUnique({
      where: {
        id: developerId,
      },
    })) as DeveloperBackend;

    return developer;
  }

  async update(
    developerId: string,
    params?: Partial<UpdateDeveloperParams> | undefined,
  ): Promise<DeveloperBackend> {
    try {
      const changeFields = { password: '', username: '' };
      const newPassword = params?.new_password ?? '';
      const oldPassword = params?.old_password ?? '';
      const username = params?.username ?? '';

      const developer = await this.checkHasDeveloper(developerId);

      if (newPassword) {
        if (!oldPassword) {
          throw new ErrorMessage(
            'To change your password, you must to send validate your old password',
            'validation',
          );
        } else {
          const isCorrect = await Password.check(
            oldPassword,
            developer.password,
          );

          if (!isCorrect) {
            throw new ErrorMessage(
              'Incorrect password, please try again!',
              'validation',
            );
          }

          changeFields.password = await Password.encrypt(newPassword, 10);
        }
      }

      if (username) {
        const hasDeveloperWithUsername = await this.findByUsername(username);

        if (hasDeveloperWithUsername) {
          throw new ErrorMessage(
            'Developer already exists with this username',
            'validation',
          );
        }

        changeFields.username = username;
      }

      const updatedDeveloper = await client.developers.update({
        where: {
          id: developer.id,
        },
        data: {
          avatar_url: params?.avatar_url || developer.avatar_url,
          name: params?.name || developer.name,
          techs: params?.techs || developer.techs,
          username: changeFields.username || developer.username,
          password: changeFields.password || developer.password,
        },
      });

      return updatedDeveloper as DeveloperBackend;
    } catch (err) {
      if (err instanceof ErrorMessage) {
        throw err;
      }
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }

  async updateGithub(
    developerId: string,
    github: string,
  ): Promise<DeveloperBackend> {
    try {
      const developer = await this.checkHasDeveloper(developerId);

      const updatedDeveloper = (await client.developers.update({
        where: {
          id: developer.id,
        },
        data: {
          github,
        },
      })) as DeveloperBackend;

      return updatedDeveloper;
    } catch (err) {
      if (err instanceof ErrorMessage) {
        throw err;
      }
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }

  async delete(developerId: string): Promise<void> {
    try {
      const developer = await this.checkHasDeveloper(developerId);

      await client.developers.delete({
        where: {
          id: developer.id,
        },
      });
    } catch (err) {
      if (err instanceof ErrorMessage) {
        throw err;
      }
      throw new ErrorMessage('Internal Server Error', 'server_error');
    }
  }

  async checkHasDeveloper(developerId: string): Promise<DeveloperBackend> {
    const developer = await this.findOne(developerId);

    if (!developer) {
      throw new ErrorMessage(`Developer with this ID doesn't exists`, 'error');
    }

    return developer;
  }

  async findByUsername(username: string): Promise<DeveloperBackend> {
    const [developer] = await client.developers.findMany({
      where: {
        username,
      },
    });

    return developer as DeveloperBackend;
  }

  async countDevelopers() {
    return await client.developers.count();
  }
}
