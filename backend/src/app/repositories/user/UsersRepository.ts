import { UserBackend } from 'src/app/views/user';

export abstract class UsersRepository {
  abstract create(user: Partial<Omit<UserBackend, 'id'>>): Promise<void>;
}
