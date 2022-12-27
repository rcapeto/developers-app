import { renderEmpyError } from '@utils/render-empty-error';
import { renderRequiredError } from '@utils/required-error-text';
import z from 'zod';

export function getCreatePublicationSchema() {
  return z.object({
    title: z
      .string(renderRequiredError('title'))
      .min(1, renderEmpyError('title')),
    description: z
      .string(renderRequiredError('description'))
      .min(1, renderEmpyError('description')),
  });
}
