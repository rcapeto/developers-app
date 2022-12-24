import { ZodError } from 'zod';
import { DeveloperBackend } from '@application/model/developer';
import {
  AccountRepository,
  AccountRepositoryCreateParams,
} from '@application/repositories/account-repository';
import { ErrorMessage } from '@application/model/error';
import { makeDeveloper } from '@test/factory/developer';
import { getRegisterSchemaValidation } from '@utils/register-schema-validation';

export class AccountInCacheRepository implements AccountRepository {
  private developers: DeveloperBackend[] = [];

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
      const error = err as ZodError;
      const message = error.issues.map((issue) => issue.message).join(', ');
      throw new ErrorMessage(message, 'validation');
    }
  }

  getDevelopers() {
    return this.developers;
  }
}
