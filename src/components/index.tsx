import * as React from 'react';
import { Stage } from '@inlet/react-pixi';
// import Rotate from '../components/samples/rotate';
import Tetoris from './samples/tetoris';

const BaseComponent = () => {
  return (
    <Stage
      width={450}
      height={900}
      options={{ backgroundColor: 0xccf1f5 }}
    >
      {/* <Rotate /> */}
      <Tetoris />
    </Stage>
  )
}

export default BaseComponent;
