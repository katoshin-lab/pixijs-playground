import * as React from 'react';
import { Container } from '@inlet/react-pixi';
import Block from '../atoms/block';
import config from '../config';
import type { Mino, Shapes } from '../types/mino';

interface BlockGroupProps {
  shape: Shapes;
  frequency: number;
  centerPosX: number;
  centerPosY: number;
  onDrop: (mino: Mino, shape: Shapes) => void;
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
    onDrop(
      config.shapes[shape].map(({ x, y }) => ({ x: centerPosX + x, y: centerPosY * frequency + y })),
      shape
    );
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
