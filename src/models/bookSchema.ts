import { z } from "zod";

export const bookSchema = z.object({
  id: z.number().int().nonnegative().optional(),
  name: z.string().min(1),
  author: z.string().min(1),
  year: z.string().min(1).max(5),
});

export type Book = z.infer<typeof bookSchema>;
