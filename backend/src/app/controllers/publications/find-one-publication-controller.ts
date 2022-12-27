import { ErrorMessage } from '@application/model/error';
import { FindOnePublicationsUsecase } from '@application/usecases/publications/findOne/find-one-publication-usecase';
import { RenderPublication } from '@application/view/publications';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { getIdParamsSchema } from '@validation/id-params-validation';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { BaseController } from '../base-controller';

export class FindOnePublicationController implements BaseController {
  constructor(private usecase: FindOnePublicationsUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      const { id: publicationId } = getIdParamsSchema().parse(request.params);

      const publication = await this.usecase.execute({ publicationId });

      return response.status(Status.OK).json({
        data: {
          publication: RenderPublication.one(publication),
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
          : Status.BAD_REQUEST;

        logger('error', error.message);

        return response.status(status).json({
          data: err,
        });
      }
    }
  }
}
