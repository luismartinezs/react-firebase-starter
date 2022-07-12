import React from 'react';
import type { FallbackProps } from 'react-error-boundary';

function DynamicErrorView({ error }: FallbackProps): JSX.Element {
  return <div>Error: {error?.message}</div>;
}

export default DynamicErrorView;
