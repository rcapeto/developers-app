import z from 'zod';

export function getIdParamsSchema() {
  return z.object({
    id: z.string({ required_error: 'ID params must be pass' }),
  });
}
