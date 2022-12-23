import { hash } from 'bcrypt';

import client from '../../config/prisma';
import { BasicUser } from '@source/entities/user';
import { UserRepository } from '@source/repositories/UserRespository';

export class PrismaUsersRepository implements UserRepository {
  async create(user: BasicUser): Promise<void> {
    const hasUser = await this.hasUserWithDocument(user.document);

    if (hasUser) {
      throw new Error('User already exists! Please try with other document.');
    }

    const password = await hash(user.password, 10);

    await client.users.create({
      data: {
        createdAt: user.createdAt ?? new Date(),
        document: user.document,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        avatarUrl: user.avatarUrl,
        password,
      },
    });
  }

  async hasUserWithDocument(document: string): Promise<boolean> {
    const [user] = await client.users.findMany({
      where: {
        document,
      },
    });

    return !!user;
  }
}
