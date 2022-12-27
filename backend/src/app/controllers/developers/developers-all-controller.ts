import { ErrorMessage } from '@application/model/error';
import { AllDevelopersUsecase } from '@application/usecases/developers/all/all-developers-usecase';
import { RenderDeveloper } from '@application/view/developer';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';

export class DevelopersAllController implements BaseController {
  constructor(private usecase: AllDevelopersUsecase) {}

  async handle(request: Request, response: Response) {
    const page = +(request.query?.page ?? 1);
    const perPage = +(request.query?.perPage ?? 10);
    const search = (request.query?.search as string) ?? '';

    try {
      const data = await this.usecase.execute({ page, perPage, search });

      const { count, developers, ...rest } = data;

      response.setHeader('X-TOTAL-COUNT', count);

      return response.status(Status.OK).json({
        data: {
          ...rest,
          developers: RenderDeveloper.many(developers),
        },
      });
    } catch (err) {
      logger('error', (err as ErrorMessage).message);

      return response.status(Status.INTERNAL_SERVER_ERROR).json({
        data: err,
      });
    }
  }
}
