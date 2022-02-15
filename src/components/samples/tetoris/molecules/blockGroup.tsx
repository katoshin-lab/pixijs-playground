import * as React from 'react';
import { Container } from '@inlet/react-pixi';
import Block from '../atoms/block';
import type { Shapes } from '../types/shapes';
import type { Mino } from '../types/mino';

interface BlockGroup {
  shape: Shapes;
  frequency: number;
  centerPosX: number;
  centerPosY: number;
  onDrop: (mino: Mino) => void;
}

const BlockGroup: React.VFC<BlockGroup> = ({
  shape,
  frequency,
  centerPosX,
  centerPosY,
  onDrop
}) => {

  const { useEffect } = React;

  const shapes = {
    t: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
    ],
    i: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: -1, y: 0 }
    ],
    o: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: -1 }
    ],
    l: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
    ],
    j: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: -1 },
    ],
    s: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
    ],
    z: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: -1 },
    ]
  }

  console.log(shape, centerPosY)

  useEffect(() => {
    onDrop(shapes[shape].map(({ x, y }) => ({ x: centerPosX + x, y: centerPosY * frequency + y })));
  }, [centerPosY])

  return (
    <Container>
      {shapes[shape].map(({ x, y }, index) => (
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
