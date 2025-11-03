import WidgetEditor from "@site/src/components/widgets/editor";
import Layout from "@theme/Layout";

export default function WidgetsPage() {
  return (
    <Layout
      title="Widgets CDC2025"
      description="Widgets configurables pour CDC2025"
    >
      <main className="container margin-vert--lg">
        <WidgetEditor />
      </main>
    </Layout>
  );
}
