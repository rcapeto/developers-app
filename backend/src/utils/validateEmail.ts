import { ErrorMessage } from '@app/views/error';
import z from 'zod';

const emailSchema = z.string().email();

export function validateEmail(email: string): string {
  try {
    const str = emailSchema.parse(email);
    return str;
  } catch (err) {
    throw new ErrorMessage('E-mail not valid', 'validation');
  }
}
