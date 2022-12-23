import { randomUUID } from 'node:crypto';

import { getUrlEnvironment } from '@source/common/url-environment';
import { BasicUser, UserEntity } from '@source/entities/user';

type Override = Partial<BasicUser>;

export function makeUser(override: Override = {}): UserEntity {
  const path = override?.avatarUrl ?? '';
  const firstName = override?.firstName ?? 'John';
  const lastName = override?.lastName ?? 'Doe';
  const name = `${firstName} ${lastName}`;

  return {
    ...override,
    avatarUrlMobile: getUrlEnvironment({ isMobile: true, path }),
    avatarUrlWeb: getUrlEnvironment({ path }),
    avatarUrl: path,
    createdAt: new Date(),
    firstName,
    lastName,
    articles: [],
    document: '00000000000',
    email: 'johndoe@gmail.com',
    name,
    id: randomUUID(),
    password: '@JDpassword123',
  };
}
