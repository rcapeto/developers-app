import { Request, Response } from 'express';
import z, { ZodError } from 'zod';

import { BaseController } from '@app/controllers/base-controller';
import { CreateUserUsecase } from '@app/usecases/users/create/create-user-usecase';
import { Status } from 'src/common/enums';
import { ErrorMessage } from '@app/views/error';
import { lenghtError } from '@utils/lenghtError';
import { logger } from 'src/common/logger';
import { fieldRequired } from '@utils/fieldRequired';

export class CreateUserController implements BaseController {
  constructor(private createUserUsecase: CreateUserUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      const {
        firstName,
        confirm_password,
        document,
        email,
        github,
        lastName,
        password,
      } = this.getSchemaValidation().parse(request.body);

      const data = {
        firstName,
        confirm_password,
        document,
        email,
        github,
        lastName,
        password,
      };

      if (password !== confirm_password) {
        const message = 'Please fill the same password in both fields';

        logger('error', message);

        return response.status(Status.BAD_REQUEST).json({
          data: new ErrorMessage(message, 'validation'),
        });
      }

      const avatar_url = request.file?.filename ?? '';

      await this.createUserUsecase.execute({
        ...data,
        name: `${firstName} ${lastName}`,
        avatar_url,
      });

      logger('success', `User with document: ${document} was created.`);

      return response.status(Status.CREATED).send();
    } catch (err) {
      const isZodError = err instanceof ZodError;

      if (isZodError) {
        const messages = err.issues.map((issue) => issue.message).join(', ');

        logger('error', messages);

        return response.status(Status.BAD_REQUEST).json({
          data: new ErrorMessage(messages, 'validation'),
        });
      } else {
        const error = err as ErrorMessage;

        logger('error', error.message);

        return response.status(Status.BAD_REQUEST).json({
          data: {
            ...error,
          },
        });
      }
    }
  }

  getSchemaValidation() {
    return z.object({
      firstName: z
        .string(fieldRequired('firstName'))
        .min(1, lenghtError('firstName', 1)),
      lastName: z
        .string(fieldRequired('lastName'))
        .min(1, lenghtError('lastName', 1)),
      document: z
        .string(fieldRequired('document'))
        .length(11, lenghtError('document', 11)),
      email: z
        .string(fieldRequired('email'))
        .min(1, lenghtError('email', 1))
        .email(),
      password: z
        .string(fieldRequired('password'))
        .min(3, lenghtError('password', 3))
        .max(8, lenghtError('password', 8)),
      confirm_password: z
        .string(fieldRequired('confirm_password'))
        .min(3, lenghtError('confirm_password', 3))
        .max(8, lenghtError('confirm_password', 8)),
      github: z
        .string(fieldRequired('github'))
        .min(1, lenghtError('github', 1)),
    });
  }
}
