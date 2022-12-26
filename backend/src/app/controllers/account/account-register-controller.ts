import { ErrorMessage } from '@application/model/error';
import { AccountRegisterUsecase } from '@application/usecases/account/register/register-usecase';
import { Status } from '@common/enums';
import { logger } from '@common/logger';
import { Request, Response } from 'express';
import { BaseController } from '../base-controller';

export class AccountRegisterController implements BaseController {
  constructor(private usecase: AccountRegisterUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      await this.usecase.execute(request.body);

      logger(
        'success',
        `Create user with ${
          request.body.username
        } at: ${new Date().toISOString()}`,
      );

      return response.status(Status.CREATED).send();
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
