import type { FC } from "react";
import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { Redirect } from "@docusaurus/router";

import { Cagnotte } from "@site/src/components/widgets/cagnotte";

export interface WidgetDefinition {
  id: string;
  displayName: string;
  component: FC;
  editor: FC;
}

export const Widgets: WidgetDefinition[] = [Cagnotte];

export type WidgetKey = keyof typeof Widgets;

interface WidgetStandaloneProps {
  id?: string;
}

const WidgetStandalone: React.FC<WidgetStandaloneProps> = ({ id }) => {
  const params = new URLSearchParams(location.search);
  const widgetId = id ?? params.get("widget");

  if (!widgetId) {
    return <Redirect to="/widgets/editor" />;
  }

  const widget = Widgets.find((widget) => widget.id === widgetId);

  if (!widget) {
    return (
      <div className="alert alert--danger margin--lg" role="alert">
        Erreur : Widget inconnu
      </div>
    );
  }

  const WidgetComponent = widget.component;

  const standaloneCSS = `
    html {
      background-color: rgba(0, 0, 0, 0);
      margin: 0 auto;
      overflow: hidden;
    }
    body {
      background-color: rgba(0, 0, 0, 0);
      margin: 0 auto;
      overflow: hidden;
    }
  `;

  return (
    <BrowserOnly>
      {() => (
        <>
          <style>{standaloneCSS}</style>
          <div className="widget widget--standalone">
            <WidgetComponent />
          </div>
        </>
      )}
    </BrowserOnly>
  );
};

export default WidgetStandalone;
