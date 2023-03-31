import { randomUUID } from 'node:crypto';
import { PublicationBackend } from '@application/model/publication';
import { makeDeveloper } from './developer';

type Override = Partial<PublicationBackend>;

export function makePublication(override: Override = {}): PublicationBackend {
  return {
    comments: [],
    createdAt: new Date(),
    description: 'Description fake',
    developer: makeDeveloper({ id: override.developerId ?? 'developerId' }),
    developerId: 'developerId',
    id: randomUUID(),
    likes: [],
    thumbnail: '',
    title: 'Title fake',
    ...override,
  };
}
