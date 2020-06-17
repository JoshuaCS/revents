import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export const LoadingComponent = ({ inverted = true }) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content="Loading..." />
    </Dimmer>
  );
};
