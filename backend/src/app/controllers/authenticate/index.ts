import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { z, ZodError } from 'zod';
import { Request, Response } from 'express';

import { AuthenticateLoginUsecase } from '@app/usecases/authenticate/login/login-usecase';
import { ErrorMessage } from '@app/views/error';
import { fieldRequired } from '@utils/fieldRequired';
import { lenghtError } from '@utils/lenghtError';
import { Status } from 'src/common/enums';
import { logger } from 'src/common/logger';
import { BaseController } from '../base-controller';
import { TransformUser } from '@app/model/User';
import { secret_key } from '@config/keys';

export class AuthenticateUserController implements BaseController {
  constructor(private authenticateLoginUsecase: AuthenticateLoginUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      const { email, password } = this.getSchemaValidation().parse(
        request.body,
      );

      const user = await this.authenticateLoginUsecase.execute({ email });

      if (!user) {
        const message = `User doesn't exists!`;

        logger('error', `${message} with email: ${email}`);

        return response.status(Status.NOT_FOUND).json({
          data: new ErrorMessage(message, 'error'),
        });
      }

      const passwordMatch = await compare(password, user.password);
      const dataJSONStr = JSON.stringify({ email, password });

      if (!passwordMatch) {
        const message = 'Password or e-mail is incorrect!';

        logger('error', `${message}: ${dataJSONStr}`);

        return response.status(Status.NOT_FOUND).json({
          data: new ErrorMessage(message, 'error'),
        });
      }

      logger('success', `Login with success! ${dataJSONStr}`);

      const token = sign({ email }, secret_key, {
        subject: user.id,
        expiresIn: '7d',
      });

      return response.status(Status.OK).json({
        data: {
          user: TransformUser.one(user),
          token,
        },
      });
    } catch (err) {
      const isZodError = err instanceof ZodError;

      if (isZodError) {
        const message = err.issues.map((er) => er.message).join(', ');

        logger('error', `Error login: ${message}`);

        return response.status(Status.BAD_REQUEST).json({
          data: new ErrorMessage(message, 'error'),
        });
      }
    }
  }

  getSchemaValidation() {
    return z.object({
      email: z
        .string(fieldRequired('email'))
        .email('Please type valid e-mail')
        .min(1, lenghtError('email', 1)),
      password: z
        .string(fieldRequired('password'))
        .min(3, lenghtError('password', 3))
        .max(8, lenghtError('password', 8)),
    });
  }
}
