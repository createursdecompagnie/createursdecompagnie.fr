import type { FC } from "react";

export interface WidgetDefinition {
  id: string;
  displayName: string;
  component: FC;
  editor: FC;
}