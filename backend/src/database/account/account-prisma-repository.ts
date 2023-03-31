import { ZodError } from 'zod';

import {
  AccountRepository,
  AccountRepositoryCreateParams,
  AccountRepositoryLoginParams,
} from '@application/repositories/account-repository';
import client from '@config/prisma';
import { ErrorMessage } from '@application/model/error';
import { getRegisterSchemaValidation } from '@validation/register-schema-validation';
import { Password } from '@utils/password';
import { getLoginSchemaValidation } from '@validation/login-schema-validation';
import { Token } from '@utils/token';

export class AccountPrismaRepository implements AccountRepository {
  async login(params: AccountRepositoryLoginParams): Promise<string> {
    try {
      const { password, username } = getLoginSchemaValidation().parse(params);

      const [developer] = await client.developers.findMany({
        where: {
          username,
        },
      });

      if (!developer) {
        throw new ErrorMessage(
          'Developer not found, please register',
          'validation',
        );
      }

      const isCorrectPassword = await Password.check(
        password,
        developer.password,
      );

      if (!isCorrectPassword) {
        throw new ErrorMessage(
          'Please verify the username or password, something is incorrect',
          'validation',
        );
      }

      const token = Token.create(developer.id, developer.username);

      return token;
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
          `There is already a developer with this username`,
          'error',
        );
      }

      const encryptedPassword = await Password.encrypt(password);

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
