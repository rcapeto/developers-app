import z from 'zod';

export function getDeveloperParamsSchema() {
  return z.object({
    id: z.string({ required_error: 'ID params must be pass' }),
  });
}
