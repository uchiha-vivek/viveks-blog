import type { ComponentType } from "react";
import MedicaidCoverage from "./medicaid-coverage";
import ZenoWalk from "./zeno-walk";
import TaylorFit from "./taylor-fit";
import PowersOfI from "./powers-of-i";
import IntervalToDisc from "./interval-to-disc";
import MultiplyRotate from "./multiply-rotate";
import LittlesLawCafe from "./littles-law-cafe";

// Every illustration, by id. To add one: create a file in this folder,
// register it here, then reference its id from a post in lib/posts.ts.
export const illustrations = {
  "medicaid-coverage": MedicaidCoverage,
  "zeno-walk": ZenoWalk,
  "taylor-fit": TaylorFit,
  "powers-of-i": PowersOfI,
  "interval-to-disc": IntervalToDisc,
  "multiply-rotate": MultiplyRotate,
  "littles-law-cafe": LittlesLawCafe,
} satisfies Record<string, ComponentType>;

export type IllustrationId = keyof typeof illustrations;
