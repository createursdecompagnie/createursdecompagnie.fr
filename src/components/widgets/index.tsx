import React from "react";

import { WidgetDefinition } from "./widget";
import { Cagnotte } from "./cagnotte";

export const Widgets: Record<string, WidgetDefinition> = {
  cagnotte: Cagnotte
};

export type WidgetKey = keyof typeof Widgets;

interface WidgetProps {
  name?: string;
}

const Widget: React.FC<WidgetProps> = ({ name }) => {
  const params = new URLSearchParams(location.search);
  const widgetName = name ?? params.get("widget");

  if (!widgetName) return null;

  const widget = Widgets[widgetName];

  if (!widget) {
    return (
      <div className="alert alert--danger margin--lg" role="alert">Erreur: Widget inconnu</div>
    );
  }

  const WidgetComponent = widget.component;
  return <WidgetComponent />;
};

export default Widget;