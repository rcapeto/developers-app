import { ErrorMessage } from '@application/model/error';
import { AccountLoginUsecase } from '@application/usecases/account/login/login-usecase';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';

export class AccountLoginController implements BaseController {
  constructor(private usecase: AccountLoginUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      const token = await this.usecase.execute(request.body);

      const username = request.body.username;

      logger(
        'success',
        `Developer login [username: ${username}]: token: ${token}`,
      );

      return response.status(Status.OK).json({
        data: { token },
      });
    } catch (err) {
      const serverError = 'Internal server error';
      const isZodError = err instanceof ErrorMessage;
      const message = isZodError ? err.message : serverError;
      const status = isZodError
        ? Status.BAD_REQUEST
        : Status.INTERNAL_SERVER_ERROR;

      logger('error', message);

      return response.status(status).json({
        data: err,
      });
    }
  }
}
