import type { ComponentType } from "react";
import SinDerivation from "./SinDerivation";
import SecantSlope from "./SecantSlope";

// Interactive pieces a post can place between paragraphs, by id.
// Unlike sketches, these are never used as covers or link previews.
export const interactives = {
  "sin-derivation": SinDerivation,
  "secant-slope": SecantSlope,
} satisfies Record<string, ComponentType>;

export type InteractiveId = keyof typeof interactives;
