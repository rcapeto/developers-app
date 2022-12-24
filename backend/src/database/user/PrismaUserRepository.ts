import {
  FindManyParams,
  FindManyResponse,
  UsersRepository,
} from '@app/repositories/user/UsersRepository';
import { hash } from 'bcrypt';

import { UserBackend } from '@app/views/user';
import client from '@config/prisma';
import { ErrorMessage } from '@app/views/error';
import { TransformUser } from '@app/model/User';

export class PrismaUserRepository implements UsersRepository {
  async create(user: Omit<UserBackend, 'id'>): Promise<void> {
    const hasUser = await this.getUserWithDocument(user.document);

    if (hasUser) {
      throw new ErrorMessage('Already exists user!', 'error');
    }

    try {
      const password = await hash(user.password, 5);

      await client.users.create({
        data: {
          document: user.document,
          email: user.email,
          firstName: user.firstName,
          github: user.github,
          lastName: user.lastName,
          name: user.name,
          password,
          avatar_url: user.avatar_url,
          createdAt: new Date(),
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async findMany(params?: FindManyParams): Promise<FindManyResponse> {
    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 10;
    const count = await this.count();

    const users = await client.users.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        avatar_url: true,
        firstName: true,
        lastName: true,
        email: true,
        document: true,
        github: true,
        name: true,
      },
    });

    return {
      page,
      perPage,
      users: TransformUser.many(users as UserBackend[]),
      totalPages: Math.ceil(count / perPage),
    };
  }

  async getUserWithDocument(document: string): Promise<boolean> {
    const [user] = await client.users.findMany({
      where: {
        document,
      },
    });

    return !!user;
  }

  async findByEmail(email: string): Promise<UserBackend | undefined> {
    const [user] = await client.users.findMany({
      where: {
        email,
      },
    });
    return user as UserBackend;
  }

  async count(): Promise<number> {
    const count = await client.users.count();
    return count;
  }
}
