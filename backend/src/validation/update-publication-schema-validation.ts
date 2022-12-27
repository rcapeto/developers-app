import { renderRequiredError } from '@utils/required-error-text';
import z from 'zod';

export function getUpdatePublicationSchema() {
  return z.object({
    title: z.string(renderRequiredError('title')),
    description: z.string(renderRequiredError('description')),
  });
}
