import { renderRequiredError } from '@utils/required-error-text';
import z from 'zod';

export function getRegisterSchemaValidation() {
  return z.object({
    name: z.string(renderRequiredError('name')),
    confirm_password: z.string(renderRequiredError('confirm_password')),
    password: z.string(renderRequiredError('password')),
    username: z.string(renderRequiredError('username')),
  });
}
