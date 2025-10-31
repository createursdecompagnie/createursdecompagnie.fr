import React, { useState } from "react";
import { WidgetDefinition } from '@site/src/components/widgets/widget'
import { Widgets, WidgetKey } from '@site/src/components/widgets'

export default function WidgetConfigurator() {

  const widgetKeys = Object.keys(Widgets) as WidgetKey[];
  const [currentWidget, setCurrentWidget] = useState<WidgetKey>(widgetKeys[0]);

  const selectWidget = (key: WidgetKey): void => {
    setCurrentWidget(key);
  };

  const WidgetComponent = Widgets[currentWidget]?.component;
  const ConfiguratorComponent = Widgets[currentWidget]?.configurator;

  return (
    <>
      <h1>🔗 Générateur de Widget CDC2025</h1>
      <div className="row">
        <div className="col col--6 margin-bottom--md">
          <div className="card ">
            <div className="card__header">
              <h2>⚙️ Configuration</h2>
            </div>
            <div className="card__body">
              <h4>Type de widget</h4>
              <div className="button-group button-group--block margin-vert--md">
                {(Object.entries(Widgets) as [WidgetKey, WidgetDefinition][]).map(([key, widget]) => (
                  <button
                    key={key}
                    onClick={() => selectWidget(key)}
                    className={`button button--primary ${
                      currentWidget === key ? 'button--active' : 'button--outline'
                    }`}
                  >
                    {widget.displayName}
                  </button>
                ))}
              </div>
              <ConfiguratorComponent />
            </div>
          </div>
        </div>
        <div className="col col--6 margin-bottom--md">
          <div className="card">
            <div className="card__header">
              <h2>👁️ Aperçu</h2>
            </div>
            <div className="card__body">
              <div className="alert alert--secondary margin-bottom--md padding-vert--sm" style={{ borderLeftWidth: 'inherit' }}>
                  <WidgetComponent />
              </div>
              <div className="alert alert--secondary padding-vert--sm" style={{ borderLeftWidth: 'inherit' }}>
                <strong className="text-[#6496c8]">🎬 Comment l'utiliser:</strong><br />
                1. Sélectionne le type de widget<br />
                2. Personnalise le<br />
                3. Copie le lien<br />
                4. Ajoute une source dans OBS/Streamlabs
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
