import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { Redirect } from '@docusaurus/router';

import { WidgetDefinition } from "./widget";
import { Cagnotte } from "./cagnotte";
import { Barre } from "./barre";

export const Widgets: WidgetDefinition[] = [
  Cagnotte,
  Barre
];

export type WidgetKey = keyof typeof Widgets;

interface WidgetProps {
  id?: string;
}

const Widget: React.FC<WidgetProps> = ({ id }) => {
  const params = new URLSearchParams(location.search);
  const widgetId = id ?? params.get("widget");

  if (!widgetId) {
    return <Redirect to="/widgets/editor" />;
  }

  const widget = Widgets.find(widget => widget.id == widgetId);

  if (!widget) {
    return (
      <div className="alert alert--danger margin--lg" role="alert">Erreur: Widget inconnu</div>
    );
  }

  const WidgetComponent = widget.component;
  return (
    <BrowserOnly>
      {() => <WidgetComponent />}
    </BrowserOnly>
  );
};

export default Widget;