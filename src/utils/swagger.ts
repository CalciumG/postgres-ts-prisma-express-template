import fs from "fs";
import path from "path";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { userRegistry } from "../models/User/userRegistry";
import { combineRegistries } from "./combineRegistries";

const combinedRegistry = combineRegistries(userRegistry);

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
});

const outputPath = path.resolve(__dirname, "../openapi.json");
fs.writeFileSync(outputPath, JSON.stringify(openApiDoc, null, 2), "utf-8");
