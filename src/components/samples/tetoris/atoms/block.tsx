import * as React from 'react';
import { Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

const Block = ({ color = 0x888888, posX = 0, posY = 0 }) => {
  const { useCallback } = React;
  console.log(posY)
  const draw = useCallback((g: PIXI.Graphics): void => {
    g.clear();
    g.beginFill(color);
    g.lineStyle(2, 0x000000);
    g.drawRect(25 + (40 * posX), 98 + (40 * posY), 40, 40);
    g.endFill();
  }, [posY])

  return (
    <Graphics draw={draw} />
  )
}

export default Block
