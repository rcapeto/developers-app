import { ZodError } from 'zod';
import { ErrorMessage } from '@application/model/error';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';
import { UpdatePublicationsUsecase } from '@application/usecases/publications/update/update-publication-usecase';
import { getUpdatePublicationSchema } from '@validation/update-publication-schema-validation';
import { getIdParamsSchema } from '@validation/id-params-validation';
import { RenderPublication } from '@application/view/publications';

export class UpdatePublicationController implements BaseController {
  constructor(private usecase: UpdatePublicationsUsecase) {}

  async handle(request: Request, response: Response) {
    const developerId = request.developer_id;

    try {
      const { description, title } = getUpdatePublicationSchema().parse(
        request.body,
      );

      const { id: publicationId } = getIdParamsSchema().parse(request.params);

      const thumbnail = request.file?.filename ?? '';

      const publication = await this.usecase.execute({
        description,
        developerId,
        publicationId,
        title,
        thumbnail,
      });

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
