import type { TStatusToneProp, TToneMap } from "typescript/types";
import { StatusEnum } from "typescript/enums";

export const statusTone: TStatusToneProp = {
  [StatusEnum.CRITICAL]: "error",
  [StatusEnum.STABLE]: "success",
  [StatusEnum.OBSERVATION]: "warning",
  [StatusEnum.RECOVERY]: "info",
  [StatusEnum.CONFIRMED]: "success",
  [StatusEnum.WAITING]: "warning",
  [StatusEnum.COMPLETED]: "success",
  [StatusEnum.TRIAGE]: "error",
  [StatusEnum.HIGH]: "error",
  [StatusEnum.MEDIUM]: "warning",
  [StatusEnum.LOW]: "success",
  [StatusEnum.OPTIMAL]: "success",
  [StatusEnum.FLAGGED]: "error",
  [StatusEnum.VERIFIED]: "success",
  [StatusEnum.PROCESSING]: "warning",
};
export const toneMap: TToneMap = {
  cyan: ["#06b6d4", "#22d3ee"],
  emerald: ["#10b981", "#34d399"],
  violet: ["#8b5cf6", "#c084fc"],
  amber: ["#f59e0b", "#fbbf24"],
  rose: ["#ef4444", "#fb7185"],
} as const;
