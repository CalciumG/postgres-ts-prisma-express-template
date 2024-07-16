import fs from "fs";
import path from "path";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { authRegistry } from "../registry/authRegistry";
import { combineRegistries } from "./combineRegistries";
import { protectedRegistry } from "../registry/protectedRegistry";

const combinedRegistry = combineRegistries(authRegistry, protectedRegistry);

const generator = new OpenApiGeneratorV3(combinedRegistry.definitions);

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
  security: [
    {
      BearerAuth: [],
    },
  ],
});

openApiDoc.components = {
  ...(generator.generateComponents().components || {}),
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

const outputPath = path.resolve(__dirname, "../openapi.json");
fs.writeFileSync(outputPath, JSON.stringify(openApiDoc, null, 2), "utf-8");
