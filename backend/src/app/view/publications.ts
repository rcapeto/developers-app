import {
  PublicationBackend,
  PublicationFrontend,
} from '@application/model/publication';
import { getUrlEnvironment } from '@utils/url-environment';
import { RenderDeveloper } from './developer';

export class RenderPublication {
  static one(publication: PublicationBackend): PublicationFrontend {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { thumbnail, developer, ...rest } = publication;

    return {
      developer: RenderDeveloper.one(developer),
      ...rest,
      thumbnail: {
        mobile: getUrlEnvironment({
          isMobile: true,
          path: thumbnail,
          uploadFolder: 'uploads_publications',
        }),
        web: getUrlEnvironment({
          path: thumbnail,
          uploadFolder: 'uploads_publications',
        }),
        origin: thumbnail,
      },
    };
  }

  static many(publications: PublicationBackend[]): PublicationFrontend[] {
    return publications.map(RenderPublication.one);
  }
}
