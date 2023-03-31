import { renderEmpyError } from '@utils/render-empty-error';
import { renderRequiredError } from '@utils/required-error-text';
import z from 'zod';

export function getLoginSchemaValidation() {
  return z.object({
    username: z
      .string(renderRequiredError('username'))
      .min(1, renderEmpyError('username')),
    password: z
      .string(renderRequiredError('password'))
      .min(1, renderEmpyError('password')),
  });
}
