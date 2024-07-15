import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const UserSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    username: z.string().openapi({ example: "JohnDoe" }),
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  })
  .openapi("User");

export const NewUserSchema = z
  .object({
    username: z.string().openapi({ example: "JohnDoe" }),
  })
  .openapi("NewUser");

export type User = z.infer<typeof UserSchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
