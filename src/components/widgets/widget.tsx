import type { FC } from "react";

export interface WidgetDefinition {
  displayName: string;
  component: FC;
  configurator: FC;
}