import * as React from 'react';
import { Stage } from '@inlet/react-pixi';
import Rotate from '../components/samples/rotate';

const BaseComponent = () => {
  return (
    <Stage
      width={500}
      height={500}
      options={{ backgroundColor: 0xccf1f5 }}
    >
      <Rotate />
    </Stage>
  )
}

export default BaseComponent;
