import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { UserSchema, NewUserSchema } from "./userSchema";

export const userRegistry = new OpenAPIRegistry();

userRegistry.register("User", UserSchema);
userRegistry.register("NewUser", NewUserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/api/users",
  summary: "Get all users",
  tags: ["Users"],
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

userRegistry.registerPath({
  method: "post",
  path: "/api/users",
  summary: "Create a new user",
  tags: ["Users"],
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

userRegistry.registerPath({
  method: "delete",
  path: "/api/users/{id}",
  summary: "Delete a user",
  tags: ["Users"],
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
