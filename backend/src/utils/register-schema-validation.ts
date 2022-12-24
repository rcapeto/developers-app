import z from 'zod';

export function getRegisterSchemaValidation() {
  return z.object({
    name: z.string({ required_error: 'Field name is required ' }),
    confirm_password: z.string({
      required_error: 'Field confirm_password is required ',
    }),
    password: z.string({ required_error: 'Field password is required ' }),
    username: z.string({
      required_error: 'Field username password is required ',
    }),
  });
}
