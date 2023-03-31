import { ZodError } from 'zod';
import { ErrorMessage } from '@application/model/error';
import { AllDeveloperPublicationsUsecase } from '@application/usecases/publications/developer-publications/developer-publications-usecase';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { getIdParamsSchema } from '@validation/id-params-validation';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';
import { RenderPublication } from '@application/view/publications';

export class AllDeveloperPublicationsController implements BaseController {
  constructor(private usecase: AllDeveloperPublicationsUsecase) {}

  async handle(request: Request, response: Response) {
    const page = +(request.query?.page ?? 1);
    const perPage = +(request.query?.perPage ?? 10);

    const { id: developerId } = getIdParamsSchema().parse(request.params);

    try {
      const data = await this.usecase.execute({
        developerId,
        params: {
          perPage,
          page,
        },
      });

      const { count, publications, ...rest } = data;

      response.setHeader('X-TOTAL-COUNT', count);

      return response.status(Status.OK).json({
        data: {
          ...rest,
          publications: RenderPublication.many(publications),
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
