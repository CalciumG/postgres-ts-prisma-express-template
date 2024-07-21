import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export class AccessibleOpenAPIRegistry extends OpenAPIRegistry {
  getDefinitions() {
    return (this as any)._definitions;
  }
}

export const combineRegistries = (
  ...registries: AccessibleOpenAPIRegistry[]
): OpenAPIRegistry => {
  const combinedRegistry = new AccessibleOpenAPIRegistry();

  registries.forEach((registry) => {
    const definitions = registry.getDefinitions();
    if (definitions && Array.isArray(definitions)) {
      (combinedRegistry as any)._definitions.push(...definitions);
    }
  });

  return combinedRegistry;
};
