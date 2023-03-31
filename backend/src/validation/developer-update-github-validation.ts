import { renderRequiredError } from '@utils/required-error-text';
import z from 'zod';

export function getUpdateDeveloperGithubSchema() {
  return z.object({
    github: z.string(renderRequiredError('github')),
  });
}
