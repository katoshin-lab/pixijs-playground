import * as React from 'react';
import { Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import config from '../config';

interface BlockProps {
  color?: number;
  posX?: number;
  posY?: number;
}

const Block: React.VFC<BlockProps> = ({ color = 0x252525, posX = 0, posY = 0 }) => {
  const { useCallback } = React;
  const draw = useCallback((g: PIXI.Graphics): void => {
    g.clear();
    g.beginFill(color);
    g.lineStyle(2, 0x222222);
    g.drawRect(25 + (config.size.block * posX), 98 + (config.size.block * posY), 40, 40);
    g.endFill();
  }, [posY])

  return (
    <Graphics draw={draw} />
  )
}

export default Block
