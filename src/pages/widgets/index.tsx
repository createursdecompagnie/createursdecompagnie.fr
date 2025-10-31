import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import WidgetConfigurator from "../../components/widgets/configurator";
import Widget from "../../components/widgets";

export default function WidgetsPage() {
  const [widget, setWidget] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Ce code ne s'exécute que dans le navigateur
    const params = new URLSearchParams(window.location.search);
    setWidget(params.get("widget"));
  }, []);

  return (
    <BrowserOnly>
      {() =>
        widget ? (
          <Widget />
        ) : (
          <Layout
            title="Widgets CDC2025"
            description="Widgets configurables pour CDC2025"
          >
            <main className="container margin-vert--lg">
              <WidgetConfigurator />
            </main>
          </Layout>
        )
      }
    </BrowserOnly>
  );
}
