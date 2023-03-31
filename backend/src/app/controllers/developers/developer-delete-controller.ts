import { ErrorMessage } from '@application/model/error';
import { DeleteDeveloperUsecase } from '@application/usecases/developers/delete/delete-developer-usecase';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';

export class DeveloperDeleteController implements BaseController {
  constructor(private usecase: DeleteDeveloperUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      const developerId = request.developer_id;

      await this.usecase.execute({ developerId });

      request.developer_id = '';

      return response.status(Status.OK).send();
    } catch (err) {
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
