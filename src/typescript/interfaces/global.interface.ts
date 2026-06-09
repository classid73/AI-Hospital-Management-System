import type { TReactNode } from "typescript/types";

export interface IReactNode {
  children: TReactNode;
}
export interface IPageHeaderProps {
  kicker?: string;
  title: TReactNode;
  description?: string;
  actions?: TReactNode;
}
