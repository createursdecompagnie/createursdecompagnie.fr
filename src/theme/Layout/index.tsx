import React, { JSX } from 'react';
import Layout from '@theme-original/Layout';
import type { Props } from '@theme/Layout';
import { FloatingDonateButton } from '@site/src/components/FloatingDonateButton';

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <>
      <Layout {...props} />
      <FloatingDonateButton />
    </>
  );
}
