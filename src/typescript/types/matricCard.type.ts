import type { ElementType } from "react";
import type { TTone } from "./global.type";

export type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: ElementType;
  tone?: TTone;
  progress?: number;
};
