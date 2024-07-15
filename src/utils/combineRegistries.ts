import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const combineRegistries = (
  ...registries: OpenAPIRegistry[]
): OpenAPIRegistry => {
  const combinedRegistry = new OpenAPIRegistry();

  registries.forEach((registry) => {
    const definitions = (registry as any)._definitions;
    if (definitions && Array.isArray(definitions)) {
      (combinedRegistry as any)._definitions.push(...definitions);
    }
  });

  return combinedRegistry;
};
