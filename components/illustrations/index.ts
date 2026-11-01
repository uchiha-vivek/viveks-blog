import type { ComponentType } from "react";
import MedicaidCoverage from "./medicaid-coverage";
import ZenoWalk from "./zeno-walk";
import TaylorFit from "./taylor-fit";
import PowersOfI from "./powers-of-i";
import IntervalToDisc from "./interval-to-disc";
import MultiplyRotate from "./multiply-rotate";
import LittlesLawCafe from "./littles-law-cafe";
import SinSlopeCos from "./sin-slope-cos";
import SinSqueeze from "./sin-squeeze";
import AgentDoubling from "./agent-doubling";
import AiPerceptionGap from "./ai-perception-gap";
import RetryCheck from "./retry-check";
import MedicareParts from "./medicare-parts";
import MedicareQuarters from "./medicare-quarters";
import MedicareTwoPaths from "./medicare-two-paths";
import AzurePolicyEffects from "./azure-policy-effects";
import CheckoutPatternsMap from "./checkout-patterns-map";
import RepositoryPattern from "./repository-pattern";
import FactoryPattern from "./factory-pattern";
import SingletonPattern from "./singleton-pattern";
import StrategyPattern from "./strategy-pattern";
import ObserverPattern from "./observer-pattern";
import BuilderPattern from "./builder-pattern";
import AdapterPattern from "./adapter-pattern";
import DecoratorPattern from "./decorator-pattern";
import CqrsPattern from "./cqrs-pattern";
import CircuitBreakerPattern from "./circuit-breaker-pattern";

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
  "agent-doubling": AgentDoubling,
  "ai-perception-gap": AiPerceptionGap,
  "retry-check": RetryCheck,
  "medicare-parts": MedicareParts,
  "medicare-quarters": MedicareQuarters,
  "medicare-two-paths": MedicareTwoPaths,
  "azure-policy-effects": AzurePolicyEffects,
  "checkout-patterns-map": CheckoutPatternsMap,
  "repository-pattern": RepositoryPattern,
  "factory-pattern": FactoryPattern,
  "singleton-pattern": SingletonPattern,
  "strategy-pattern": StrategyPattern,
  "observer-pattern": ObserverPattern,
  "builder-pattern": BuilderPattern,
  "adapter-pattern": AdapterPattern,
  "decorator-pattern": DecoratorPattern,
  "cqrs-pattern": CqrsPattern,
  "circuit-breaker-pattern": CircuitBreakerPattern,
  "sin-slope-cos": SinSlopeCos,
  "sin-squeeze": SinSqueeze,
} satisfies Record<string, ComponentType>;

export type IllustrationId = keyof typeof illustrations;
