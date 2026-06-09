import type { StatusEnum } from "typescript/enums";

export type TReactNode = React.ReactNode;

export type TColorProps = "success" | "warning" | "error" | "info" | "default";
export type TStatusToneProp = Record<StatusEnum, TColorProps>;
export type TTone = "cyan" | "emerald" | "violet" | "amber" | "rose";
export type TToneMap = Record<TTone, readonly [string, string]>;
