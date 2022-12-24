import { ErrorMessage } from '@application/model/error';
import { AccountRegisterUsecase } from '@application/usecases/account/register-usecase';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';

export class AccountController implements BaseController {
  constructor(private accountRegisterUsecase: AccountRegisterUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      await this.accountRegisterUsecase.execute(request.body);

      logger(
        'success',
        `Create user with ${
          request.body.username
        } at: ${new Date().toISOString()}`,
      );

      return response.status(Status.CREATED).send();
    } catch (err) {
      const serverError = 'Internal server error';
      const isErrorMessage = err instanceof ErrorMessage;
      const message = isErrorMessage ? err.message : serverError;
      const status = isErrorMessage
        ? Status.BAD_REQUEST
        : Status.INTERNAL_SERVER_ERROR;

      logger('error', message);

      return response.status(status).json({
        data: err,
      });
    }
  }
}
