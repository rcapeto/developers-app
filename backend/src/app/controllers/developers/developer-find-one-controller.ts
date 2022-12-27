import { ErrorMessage } from '@application/model/error';
import { FindOneDeveloperUsecase } from '@application/usecases/developers/findOne/find-one-developer-usecase';
import { RenderDeveloper } from '@application/view/developer';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { getIdParamsSchema } from '@validation/id-params-validation';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { BaseController } from '../base-controller';

export class DeveloperFindOneController implements BaseController {
  constructor(private usecase: FindOneDeveloperUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      const { id: developerId } = getIdParamsSchema().parse(request.params);

      const developer = await this.usecase.execute({ developerId });

      if (!developer) {
        return response.status(Status.NOT_FOUND).json({
          data: new ErrorMessage(
            `Developer with this ID doesn't exists`,
            'error',
          ),
        });
      }

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
