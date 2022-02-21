import * as React from 'react';
import type { Mino, Shape, Stack } from '../types/mino';
import config from '../config';

export const useStackManager = () => {
  const { useState } = React;
  const baseY = config.size.board.vertical / config.size.block;
  // create 2-dimensional null array for initializing 20 X 10 stacking
  const stackLevelsArray = [...Array(baseY)].map(() => (
    [...Array(config.size.board.horizontal / config.size.block)].map(() => null)
  ))

  const [stack, setStack] = useState<Stack>(stackLevelsArray);

  const detectCollision = (mino: Mino): boolean => {
    const baseBlocks = mino.filter((block, _, arr) => {
      const sameXBlocks = arr.filter(a => a.x === block.x);
      if (sameXBlocks.length === 1) {
        return true;
      } else {
        const maxY = Math.max(...sameXBlocks.map(xBlock => xBlock.y));
        return maxY === block.y;
      }
    })
    const isHitBoardBase = baseBlocks.some(block => block.y === baseY - 1);

    return isHitBoardBase;
  }

  const stackMino = (mino: Mino, shape: Shape | undefined): void => {
    if (shape) {
      const stacked = [...stack];
      mino.forEach(block => {
        stacked[block.y][block.x] = shape;
      });
      setStack(stacked);
    }
  }

  return { stack, detectCollision, stackMino };
}
