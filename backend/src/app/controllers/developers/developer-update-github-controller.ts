import { ErrorMessage } from '@application/model/error';
import { DeveloperUpdateGithubUsecase } from '@application/usecases/developers/update-github/developer-update-github-usecase';
import { RenderDeveloper } from '@application/view/developer';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { getUpdateDeveloperGithubSchema } from '@validation/developer-update-github-validation';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { BaseController } from '../base-controller';

export class DeveloperUpdateGithubController implements BaseController {
  constructor(private usecase: DeveloperUpdateGithubUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      const { github } = getUpdateDeveloperGithubSchema().parse(request.body);
      const developerId = request.developer_id;

      const developer = await this.usecase.execute({
        developerId,
        github,
      });

      return response.status(Status.OK).json({
        data: {
          developer: RenderDeveloper.one(developer),
        },
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues.map((issue) => issue.message).join(', ');

        logger('error', message);

        return response.status(Status.BAD_REQUEST).json({
          data: new ErrorMessage(message, 'error'),
        });
      } else {
        const error = err as ErrorMessage;
        const isServerError = error.message === 'Internal Server Error';
        const status = isServerError
          ? Status.INTERNAL_SERVER_ERROR
          : Status.NOT_FOUND;

        logger('error', error.message);

        return response.status(status).json({
          data: err,
        });
      }
    }
  }
}
