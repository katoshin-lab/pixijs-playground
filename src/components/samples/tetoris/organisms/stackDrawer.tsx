import * as React from 'react';
import type { Stack } from '../types/mino';

interface StackDrawerProps {
  stack: Stack
}

const StackDrawer: React.VFC<StackDrawerProps> = React.memo(({
  stack
}) => {
  console.log(stack)
  return (
    null
  )
})

export default StackDrawer;
