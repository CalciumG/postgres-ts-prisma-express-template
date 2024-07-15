import express from "express";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";

/**
 * Generates swagger documentation
 * @param apiSpecPath The absolute path to the OpenApi YAML
 * @param app The express app
 * @param route The route to display the swagger docs
 */
export const useSwaggerDocs = (
  apiSpecPath: string,
  app: express.Application,
  route = "/api-docs"
) => {
  try {
    const file = fs.readFileSync(apiSpecPath, "utf8");
    const swaggerDocument = YAML.parse(file);
    app.use(route, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (err) {
    if (err instanceof Error) {
      console.error("Could not generate swagger documents", err);
    }
  }
};
