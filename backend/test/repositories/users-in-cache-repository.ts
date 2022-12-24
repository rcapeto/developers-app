import { randomUUID } from 'node:crypto';

import { UsersRepository } from '@app/repositories/user/UsersRepository';
import { UserBackend } from '@app/views/user';
import { validateEmail } from '@utils/validateEmail';

export class UsersInCacheRepository implements UsersRepository {
  public users: UserBackend[];

  constructor() {
    this.users = [];
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
}
