import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int().nonnegative().optional(),
  username: z.string().min(1),
  password: z.string().min(8),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  birth_date: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;
