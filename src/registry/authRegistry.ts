import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { UserSchema, NewUserSchema } from "../models/User/userSchema";
import { z } from "zod";

export const authRegistry = new OpenAPIRegistry();

authRegistry.register("User", UserSchema);
authRegistry.register("NewUser", NewUserSchema);

authRegistry.registerPath({
  method: "post",
  path: "/auth/register",
  summary: "Register a new user",
  tags: ["Auth"],
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

authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  summary: "Login a user",
  tags: ["Auth"],
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
    200: {
      description: "The access and refresh tokens",
      content: {
        "application/json": {
          schema: z.object({
            accessToken: z.string().openapi({ example: "your_access_token" }),
            refreshToken: z.string().openapi({ example: "your_refresh_token" }),
          }),
        },
      },
    },
    401: {
      description: "Invalid username or password",
    },
  },
});

authRegistry.registerPath({
  method: "post",
  path: "/auth/refresh-token",
  summary: "Refresh access token",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            refreshToken: z.string().openapi({ example: "your_refresh_token" }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "New access token",
      content: {
        "application/json": {
          schema: z.object({
            accessToken: z.string().openapi({ example: "your_access_token" }),
          }),
        },
      },
    },
    401: {
      description: "Invalid refresh token",
    },
  },
});
