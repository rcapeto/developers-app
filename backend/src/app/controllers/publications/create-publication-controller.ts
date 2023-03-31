import { ZodError } from 'zod';
import { ErrorMessage } from '@application/model/error';
import { CreatePublicationsUsecase } from '@application/usecases/publications/create/create-publication-usecase';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { getCreatePublicationSchema } from '@validation/create-publication-schema-validation';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';

export class CreatePublicationController implements BaseController {
  constructor(private usecase: CreatePublicationsUsecase) {}

  async handle(request: Request, response: Response) {
    const developerId = request.developer_id;

    try {
      const { description, title } = getCreatePublicationSchema().parse(
        request.body,
      );

      const thumbnail = request.file?.filename ?? '';

      await this.usecase.execute({
        description,
        developerId,
        title,
        thumbnail,
      });

      return response.status(Status.CREATED).send();
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
