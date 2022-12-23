import { z } from 'zod';

import { UserRepository } from '@repositories/UserRespository';
import { UserEntity } from '@source/entities/user';

export class UsersInCacheRepository implements UserRepository {
  public users: UserEntity[];

  constructor() {
    this.users = [];
  }
  async create(user: UserEntity): Promise<void> {
    try {
      this.validateEmail(user.email);
      this.users.push(user);
    } catch (err) {
      throw err;
    }
  }

  private validateEmail(email: string) {
    const emailSchema = z.string().email();

    try {
      emailSchema.parse(email);
    } catch (err) {
      throw new Error('Invalid e-mail format');
    }
  }
}
