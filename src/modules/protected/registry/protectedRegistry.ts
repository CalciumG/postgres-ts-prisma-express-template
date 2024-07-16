import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const protectedRegistry = new OpenAPIRegistry();

protectedRegistry.registerPath({
  method: "get",
  path: "/api/protected",
  summary: "Get protected resource",
  tags: ["Protected"],
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "A protected resource",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "This is a protected route" }),
            user: z
              .object({
                userId: z.number().openapi({ example: 1 }),
                username: z.string().openapi({ example: "JohnDoe" }),
              })
              .openapi("User"),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
    },
  },
});
