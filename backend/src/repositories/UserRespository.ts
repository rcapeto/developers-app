import { BasicUser } from '@entities/user';

export abstract class UserRepository {
  abstract create(user: BasicUser): Promise<void>;
}
