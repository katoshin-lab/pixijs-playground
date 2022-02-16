import * as React from 'react';
import { Container } from '@inlet/react-pixi';
import Block from '../atoms/block';
import type { Stack } from '../types/mino';

interface StackDrawerProps {
  stack: Stack
}

const StackDrawer: React.VFC<StackDrawerProps> = React.memo(({
  stack
}) => {
  console.log(stack)
  return (
    <Container>
      {
        stack.map((row, y) => (
          row.map((shape, x) => (
            shape &&
            <Block
              key={`${y}${x}`}
              posY={y}
              posX={x}
            />
          ))
        ))
      }
    </Container>
  )
})

export default StackDrawer;
