import { renderRequiredError } from '@utils/required-error-text';
import z from 'zod';

export function getLoginSchemaValidation() {
  return z.object({
    username: z.string(renderRequiredError('username')),
    password: z.string(renderRequiredError('password')),
  });
}
