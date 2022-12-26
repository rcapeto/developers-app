import { ZodError } from 'zod';
import { DeveloperBackend } from '@application/model/developer';
import {
  AccountRepository,
  AccountRepositoryCreateParams,
  AccountRepositoryLoginParams,
} from '@application/repositories/account-repository';
import { ErrorMessage } from '@application/model/error';
import { makeDeveloper } from '@test/factory/developer';
import { getRegisterSchemaValidation } from '@validation/register-schema-validation';
import { getLoginSchemaValidation } from '@validation/login-schema-validation';

export class AccountInCacheRepository implements AccountRepository {
  private developers: DeveloperBackend[] = [];

  async login(params: AccountRepositoryLoginParams): Promise<string> {
    try {
      const { password, username } = getLoginSchemaValidation().parse(params);

      const developer = this.developers.find(
        (dev) => dev.username === username,
      );

      if (!developer) {
        throw new ErrorMessage(
          'Developer not found, please register',
          'validation',
        );
      }

      if (developer.password !== password) {
        throw new ErrorMessage(
          'Please verify the username or password, something is incorrect',
          'validation',
        );
      }

      const token = Date.now().toString();
      return token;
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues.map((issue) => issue.message).join(', ');
        throw new ErrorMessage(message, 'validation');
      } else {
        throw new ErrorMessage('Internal Server Error', 'server_error');
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

      const developer = makeDeveloper({
        name,
        password,
        username,
      });

      this.getDevelopers().push(developer);
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues.map((issue) => issue.message).join(', ');
        throw new ErrorMessage(message, 'validation');
      } else {
        throw new ErrorMessage('Internal Server Error', 'server_error');
      }
    }
  }

  getDevelopers() {
    return this.developers;
  }
}
