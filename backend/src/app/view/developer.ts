import {
  DeveloperBackend,
  DeveloperFrontend,
} from '@application/model/developer';
import { getUrlEnvironment } from '@utils/url-environment';

export class RenderDeveloper {
  static one(developer: DeveloperBackend): DeveloperFrontend {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar_url, password: _, ...rest } = developer;

    return {
      ...rest,
      avatar_url: {
        mobile: getUrlEnvironment({ isMobile: true, path: avatar_url }),
        web: getUrlEnvironment({ path: avatar_url }),
        origin: avatar_url,
      },
    };
  }

  static many(developers: DeveloperBackend[]): DeveloperFrontend[] {
    return developers.map(RenderDeveloper.one);
  }
}
