import { Request, Response } from 'express';
import z, { ZodError } from 'zod';

import { CreateUserUsecase } from '@source/usecases/users/create-user-usecase';
import { Status } from '../../common/enums';
import { logger } from '../../common/logger';
import { ErrorMessage } from '../../entities/error';

const createBodySchema = z.object({
  document: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  confirm_password: z.string(),
});

export class CreateUserController {
  constructor(private createUserUsecase: CreateUserUsecase) {}

  async handle(request: Request, response: Response) {
    try {
      const {
        document,
        email,
        firstName,
        lastName,
        password,
        confirm_password,
      } = createBodySchema.parse(request.body);

      const name = `${firstName} ${lastName}`;

      if (password !== confirm_password) {
        logger(
          'error',
          `Error create User, error: Password !== Cofirm_Password`,
        );

        return response.status(Status.BAD_REQUEST).json({
          data: new ErrorMessage(
            'Please fill the same password',
            'Please write the same passwords in both fields',
            true,
          ),
        });
      }

      const filename = request?.file?.filename ?? '';

      await this.createUserUsecase.execute({
        document,
        email,
        firstName,
        lastName,
        password,
        avatarUrl: filename,
        name,
      });

      return response.status(Status.CREATED).send();
    } catch (err) {
      if (err instanceof ZodError) {
        const issue = err.issues[0];

        if (issue) {
          const error = `Error create user: ${issue.message}`;
          logger('error', `Error create User, error: ${error}`);

          return response.status(Status.BAD_REQUEST).json({
            data: new ErrorMessage(error, issue.message, true),
          });
        }
      }

      const error = (err as Error).message;

      logger('error', `Error create User, error: ${error}`);

      return response.status(Status.BAD_REQUEST).json({
        data: new ErrorMessage(error, 'Create Error', true),
      });
    }
  }
}
