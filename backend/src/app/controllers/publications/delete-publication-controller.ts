import { ZodError } from 'zod';
import { ErrorMessage } from '@application/model/error';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';
import { DeletePublicationsUsecase } from '@application/usecases/publications/delete/delete-publication-usecase';
import { getIdParamsSchema } from '@validation/id-params-validation';

export class DeletePublicationController implements BaseController {
  constructor(private usecase: DeletePublicationsUsecase) {}

  async handle(request: Request, response: Response) {
    const developerId = request.developer_id;

    try {
      const { id: publicationId } = getIdParamsSchema().parse(request.params);

      await this.usecase.execute({
        developerId,
        publicationId,
      });

      return response.status(Status.OK).send();
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
