import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { UserSchema, NewUserSchema } from "../schemas/userSchema";

const registry = new OpenAPIRegistry();

registry.register("User", UserSchema);
registry.register("NewUser", NewUserSchema);

registry.registerPath({
  method: "get",
  path: "/api/users",
  summary: "Get all users",
  responses: {
    200: {
      description: "A list of users",
      content: {
        "application/json": {
          schema: UserSchema.array(),
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/users",
  summary: "Create a new user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created user",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/users/{id}",
  summary: "Delete a user",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "integer",
        example: 1,
      },
    },
  ],
  responses: {
    204: {
      description: "User deleted successfully",
    },
    404: {
      description: "User not found",
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDoc = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Example App",
    version: "0.0.0",
    description: "Example App API",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local",
    },
  ],
});
