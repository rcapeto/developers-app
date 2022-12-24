import { Request, Response } from 'express';
import { BaseController } from '@app/controllers/base-controller';
import { Status } from 'src/common/enums';
import { FindManyUsersUsecase } from '@app/usecases/users/findMany/find-many-users-usecase';

export class FindManyUserController implements BaseController {
  constructor(private findManyUsecase: FindManyUsersUsecase) {}

  async handle(request: Request, response: Response) {
    const page = +(request.query?.page ?? '');
    const perPage = +(request.query?.perPage ?? '');

    const dbResponse = await this.findManyUsecase.execute({
      perPage,
      page,
    });

    return response.status(Status.OK).json({
      data: dbResponse,
    });
  }
}
