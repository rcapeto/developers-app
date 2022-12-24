import { ZodError } from 'zod';

import {
  AccountRepository,
  AccountRepositoryCreateParams,
} from '@application/repositories/account-repository';
import client from '@config/prisma';
import { ErrorMessage } from '@application/model/error';
import { hash } from 'bcrypt';
import { getRegisterSchemaValidation } from '@utils/register-schema-validation';

export class AccountPrismaRepository implements AccountRepository {
  async register(params: AccountRepositoryCreateParams): Promise<void> {
    try {
      const { confirm_password, name, password, username } =
        getRegisterSchemaValidation().parse(params);

      if (password !== confirm_password) {
        throw new ErrorMessage(
          'Fill both password fields equally',
          'validation',
        );
      }

      const hasDeveloper = await this.getDeveloperWithUsername(username);

      if (hasDeveloper) {
        throw new ErrorMessage(
          `There is already a user with this ${username}`,
          'error',
        );
      }

      const encryptedPassword = await hash(password, 10);

      await client.developers.create({
        data: {
          avatar_url: '',
          github: '',
          name,
          password: encryptedPassword,
          techs: '',
          username,
        },
      });
    } catch (err) {
      if (err instanceof ErrorMessage) {
        throw err;
      } else if (err instanceof ZodError) {
        const message = err.issues.map((issue) => issue.message).join(', ');
        throw new ErrorMessage(message, 'validation');
      } else {
        throw new ErrorMessage('Internal server error', 'server_error');
      }
    }
  }

  async getDeveloperWithUsername(username: string): Promise<boolean> {
    const [developer] = await client.developers.findMany({
      where: {
        username,
      },
    });

    return !!developer;
  }
}
