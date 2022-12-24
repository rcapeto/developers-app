import { UsersRepository } from '@app/repositories/user/UsersRepository';
import { hash } from 'bcrypt';

import { UserBackend } from '@app/views/user';
import client from '@config/prisma';
import { ErrorMessage } from '@app/views/error';

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

  async getUserWithDocument(document: string): Promise<boolean> {
    const [user] = await client.users.findMany({
      where: {
        document,
      },
    });

    return !!user;
  }
}
