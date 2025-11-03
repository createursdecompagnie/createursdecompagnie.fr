import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Widget from "@site/src/components/widgets";

export default function WidgetsPage() {
  return (
    <BrowserOnly>
      {() => <Widget />}
    </BrowserOnly>
  );
}
