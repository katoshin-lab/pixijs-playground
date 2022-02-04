import * as React from 'react';
import { Container } from '@inlet/react-pixi';
import Block from '../atoms/block';
import { Shapes } from '../types/shapes';

interface BlockGroup {
  shape: Shapes
  centerPosX: number,
  centerPosY: number
}

const BlockGroup: React.VFC<BlockGroup> = ({
  shape,
  centerPosX,
  centerPosY,
}) => {

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

  return (
    <Container>
      {shapes[shape].map(({ x, y }, index) => (
        <Block key={index} posX={centerPosX + x} posY={centerPosY + y} />
      ))}
    </Container>
  )
}

export default BlockGroup;
