import { expect, test } from "vitest";
import {
  AccessibleOpenAPIRegistry,
  combineRegistries,
} from "../combineRegistries";

// Create a mock function to simulate private property access
const mockRegistry = (definitions: any[]) => {
  const registry = new AccessibleOpenAPIRegistry();
  (registry as any)._definitions = definitions;
  return registry;
};

test("combineRegistries should combine multiple registries", () => {
  const registry1 = mockRegistry(["def1", "def2"]);
  const registry2 = mockRegistry(["def3"]);
  const registry3 = mockRegistry(["def4", "def5"]);

  const combinedRegistry = combineRegistries(registry1, registry2, registry3);

  expect((combinedRegistry as any)._definitions).toEqual([
    "def1",
    "def2",
    "def3",
    "def4",
    "def5",
  ]);
});

test("combineRegistries should handle empty registries", () => {
  const registry1 = mockRegistry(["def1", "def2"]);
  const registry2 = mockRegistry([]);

  const combinedRegistry = combineRegistries(registry1, registry2);

  expect((combinedRegistry as any)._definitions).toEqual(["def1", "def2"]);
});

test("combineRegistries should handle no registries", () => {
  const combinedRegistry = combineRegistries();

  expect((combinedRegistry as any)._definitions).toEqual([]);
});
