import type { FC } from "react";
export interface WidgetDefinition {
  id: string;
  displayName: string;
  component: FC;
  editor: FC;
}

import { Cagnotte } from "@site/src/components/widgets/cagnotte";
import { Barre } from "@site/src/components/widgets/barre";
export const Widgets: WidgetDefinition[] = [
  Cagnotte,
  Barre
];

export type WidgetKey = keyof typeof Widgets;

import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { Redirect } from '@docusaurus/router';
interface WidgetStandaloneProps {
  id?: string;
}

const WidgetStandalone: React.FC<WidgetStandaloneProps> = ({ id }) => {
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
      {() => (
        <div className={`widget widget--standalone`}>
          <WidgetComponent />
        </div>
      )}
    </BrowserOnly>
  );
};

export default WidgetStandalone;