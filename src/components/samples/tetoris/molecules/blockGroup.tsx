import * as React from 'react';
import { Container } from '@inlet/react-pixi';
import Block from '../atoms/block';
import config from '../config';
import type { Mino, Shape } from '../types/mino';

interface BlockGroupProps {
  shape: Shape;
  frequency: number;
  centerPosX: number;
  centerPosY: number;
  onDrop: (mino: Mino) => void;
}

const BlockGroup: React.VFC<BlockGroupProps> = ({
  shape,
  frequency,
  centerPosX,
  centerPosY,
  onDrop
}) => {

  const { useEffect } = React;

  useEffect(() => {
    onDrop(config.shapes[shape].map(({ x, y }) => ({ x: centerPosX + x, y: centerPosY * frequency + y })));
  }, [centerPosY])

  return (
    <Container>
      {config.shapes[shape].map(({ x, y }, index) => (
        <Block
          key={index}
          posX={centerPosX + x}
          posY={centerPosY * frequency + y}
        />
      ))}
    </Container>
  )
}

export default BlockGroup;
