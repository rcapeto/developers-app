import { UserBackend } from '@app/views/user';
import { randomUUID } from 'node:crypto';

type Override = Partial<UserBackend>;

export function makeUser(override: Override = {}): UserBackend {
  return {
    articles: [],
    comments: [],
    avatar_url: 'teste.png',
    createdAt: new Date(),
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    document: '99999999999',
    email: 'johndoe@example.com',
    github: 'john_doe',
    id: randomUUID(),
    password: '@JDtest123',
    ...override,
  };
}
