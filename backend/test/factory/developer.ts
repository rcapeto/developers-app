import { DeveloperBackend } from '@application/model/developer';
import { randomUUID } from 'node:crypto';

type Override = Partial<DeveloperBackend>;

export function makeDeveloper(override: Override = {}): DeveloperBackend {
  return {
    avatar_url: '',
    createdAt: new Date(),
    github: '',
    id: randomUUID(),
    likes: [],
    name: 'John Doe',
    password: '@test@-password',
    points: 0,
    publications: [],
    techs: '',
    username: 'johndoe',
    comments: [],
    ...override,
  };
}
