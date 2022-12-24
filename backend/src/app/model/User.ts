import { UserBackend, UserFrontEnd } from '@app/views/user';
import { getUrlEnvironment } from '@utils/url-environment';

export class TransformUser {
  static one(user: UserBackend): UserFrontEnd {
    const path = user.avatar_url ?? '';

    return {
      avatar_url_mobile: getUrlEnvironment({ isMobile: true, path }),
      avatar_url_web: getUrlEnvironment({ path }),
      articles: user.articles,
      comments: user.comments,
      createdAt: user.createdAt,
      document: user.document,
      email: user.email,
      firstName: user.firstName,
      github: user.github,
      lastName: user.lastName,
      name: user.name,
      avatar_url: user.avatar_url ?? '',
    };
  }

  static many(users: UserBackend[]): UserFrontEnd[] {
    return users.map(TransformUser.one);
  }
}
