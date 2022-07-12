import React, { Suspense, type FC } from 'react';

import { ISuspenseWrapperProps } from './SuspenseWrapper.props';

const SuspenseWrapper: FC<ISuspenseWrapperProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>} {...props}>
      {props.children}
    </Suspense>
  );
};

export default SuspenseWrapper;
