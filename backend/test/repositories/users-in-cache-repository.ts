import { randomUUID } from 'node:crypto';

import {
  FindManyParams,
  FindManyResponse,
  UsersRepository,
} from '@app/repositories/user/UsersRepository';
import { UserBackend } from '@app/views/user';
import { validateEmail } from '@utils/validateEmail';
import { TransformUser } from '@app/model/User';

export class UsersInCacheRepository implements UsersRepository {
  public users: UserBackend[];

  constructor() {
    this.users = [];
  }

  async findByEmail(email: string): Promise<UserBackend | undefined> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findMany(
    params?: FindManyParams | undefined,
  ): Promise<FindManyResponse> {
    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 10;
    const count = await this.count();

    return {
      page,
      perPage,
      users: TransformUser.many(this.users),
      totalPages: Math.ceil(count / perPage),
    };
  }

  async create(user: Omit<UserBackend, 'id'>): Promise<void> {
    try {
      const email = validateEmail(user.email);

      this.users.push({
        ...user,
        id: randomUUID(),
        createdAt: new Date(),
        email,
      });
    } catch (err) {
      throw err;
    }
  }

  async count(): Promise<number> {
    return this.users.length;
  }
}
