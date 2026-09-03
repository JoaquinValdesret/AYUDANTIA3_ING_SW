import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z
    .string({ required_error: 'El nombre de la marca es obligatorio' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede exceder los 80 caracteres')
    .trim(),
  country: z
    .string()
    .max(60, 'El país no puede exceder los 60 caracteres')
    .optional(),
  website: z
    .string()
    .max(200, 'El sitio web no puede exceder los 200 caracteres')
    .url('El sitio web debe tener un formato URL válido')
    .optional()
});
