import { UserBackend, UserFrontEnd } from 'src/app/views/user';

export interface FindManyParams {
  perPage?: number;
  page?: number;
  totalPages?: number;
}

export interface FindManyResponse extends Required<FindManyParams> {
  users: UserFrontEnd[];
}

export abstract class UsersRepository {
  abstract create(user: Partial<Omit<UserBackend, 'id'>>): Promise<void>;
  abstract findMany(params?: FindManyParams): Promise<FindManyResponse>;
  abstract count(): Promise<number>;
  abstract findByEmail(email: string): Promise<UserBackend | undefined>;
}
