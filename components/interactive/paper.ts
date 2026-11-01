import type { CSSProperties } from "react";
import { ink } from "@/components/illustrations/palette";

// Interactive cards sit on the same paper as the sketches, so they read the
// same in light and dark mode. globals.css uses these variables.
export const paper = {
  "--w-paper": ink.paper,
  "--w-ink": ink.line,
  "--w-red": ink.red,
  "--w-green": ink.green,
} as CSSProperties;
