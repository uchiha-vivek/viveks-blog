import type { ComponentType } from "react";
import MedicaidCoverage from "./medicaid-coverage";

// Every illustration, by id. To add one: create a file in this folder,
// register it here, then reference its id from a post in lib/posts.ts.
export const illustrations = {
  "medicaid-coverage": MedicaidCoverage,
} satisfies Record<string, ComponentType>;

export type IllustrationId = keyof typeof illustrations;
