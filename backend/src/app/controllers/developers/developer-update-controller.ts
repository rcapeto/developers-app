import { ErrorMessage } from '@application/model/error';
import { UpdateDeveloperUsecase } from '@application/usecases/developers/update/developer-update-usecase';
import { RenderDeveloper } from '@application/view/developer';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';

export class DeveloperUpdateController implements BaseController {
  constructor(private usecase: UpdateDeveloperUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      const { old_password, new_password, name, techs, username } =
        request.body;

      const avatar_url = request.file?.filename ?? '';
      const developerId = request.developer_id;

      const developer = await this.usecase.execute({
        developerId,
        params: {
          avatar_url,
          old_password,
          new_password,
          name,
          techs,
          username,
        },
      });

      return response.status(Status.OK).json({
        data: {
          developer: RenderDeveloper.one(developer),
        },
      });
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
