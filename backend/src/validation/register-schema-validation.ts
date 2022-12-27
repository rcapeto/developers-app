import { renderEmpyError } from '@utils/render-empty-error';
import { renderRequiredError } from '@utils/required-error-text';
import z from 'zod';

export function getRegisterSchemaValidation() {
  return z.object({
    name: z.string(renderRequiredError('name')).min(1, renderEmpyError('name')),
    confirm_password: z
      .string(renderRequiredError('confirm_password'))
      .min(1, renderEmpyError('confirm_password')),
    password: z
      .string(renderRequiredError('password'))
      .min(1, renderEmpyError('password')),
    username: z
      .string(renderRequiredError('username'))
      .min(1, renderEmpyError('username')),
  });
}
