import * as React from 'react';
import type { Mino, Shape, Stack } from '../types/mino';
import config from '../config';

export const useStackManager = () => {
  const INITIAL_X = 5;
  const { useState, useEffect, useRef } = React;
  const horizontalRange = { min: 0, max: config.size.board.horizontal / config.size.block - 1 };
  const baseY = config.size.board.vertical / config.size.block;
  // create 2-dimensional null array for initializing 20 X 10 stacking
  const stackLevelsArray = [...Array(baseY)].map(() => (
    [...Array(config.size.board.horizontal / config.size.block)].map(() => null)
  ))

  const [minoX, setMinoX] = useState(INITIAL_X);
  const [stack, setStack] = useState<Stack>(stackLevelsArray);
  const droppingMino = useRef < Mino | null>(null);

  const resetX = (): void => setMinoX(INITIAL_X);
  const refreshMino = (mino: Mino): void => {
    droppingMino.current = mino;
  }

  useEffect(() => {
    document.addEventListener('keydown', handlePressKey);

    return () => {
      document.removeEventListener('keydown', handlePressKey);
    }
  }, []);

  const handlePressKey = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowRight':
        moveHorizontal(1);
        break;
      case 'ArrowLeft':
        moveHorizontal(-1);
        break;
      default:
        break;
    }
    console.log(e.code)
  }

  const moveHorizontal = (xGap: number): void => {
    if (droppingMino.current) {
      const tentativeMovedMino: Mino = droppingMino.current.map(({ x, y }) => ({ x: x + xGap, y }));
      const collision = detectHorizontalCollision(tentativeMovedMino);
      console.log('collision', collision);
      console.log(minoX + xGap)
      collision || setMinoX(minoX + xGap);
    }
  }

  const detectHorizontalCollision = (mino: Mino): boolean => {
    let isHitBoardWall: boolean = false;
    let isHitStack: boolean = false;

    isHitBoardWall = mino.some(({ x }) => horizontalRange.min > x || horizontalRange.max < x);

    isHitStack = isHitBoardWall || mino.some(({ x, y }) => { stack[Math.ceil(y)][x] !== null })
    
    console.log(isHitBoardWall, isHitStack)
    return isHitBoardWall || isHitStack;
  }

  const detectCollision = (mino: Mino): boolean => {
    const baseBlocks = mino.filter((block, _, arr) => {
      const sameXBlocks = arr.filter(({x}) => x === block.x);
      if (sameXBlocks.length === 1) {
        return true;
      } else {
        const maxY = Math.max(...sameXBlocks.map(({y}) => y));
        return maxY === block.y;
      }
    })

    let isHitBoardBase: boolean = false;
    let isHitStack: boolean = false;

    if (baseBlocks.every(block => block.y - Math.floor(block.y) === 0)) {
      isHitBoardBase = baseBlocks.some(({y}) => y === baseY - 1);

      isHitStack = isHitBoardBase || baseBlocks.some(({x, y}) => stack[y + 1][x] !== null);
    }

    return isHitBoardBase || isHitStack;
  }

  const stackMino = (mino: Mino, shape: Shape | undefined): void => {
    if (shape) {
      droppingMino.current = null;
      const stacked = [...stack];
      mino.forEach(block => {
        stacked[block.y][block.x] = shape;
      });
      setStack(stacked);
    }
  }

  return { stack, minoX, refreshMino, resetX, detectCollision, stackMino };
}
