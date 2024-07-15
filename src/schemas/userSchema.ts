import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const NewUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type User = z.infer<typeof UserSchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
