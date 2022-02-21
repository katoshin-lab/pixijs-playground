import * as React from 'react';
import BlockGroup from '../molecules/blockGroup';
import { useMinoDropManager } from '../hooks/minoDropManager';
import type { Mino, Shape } from '../types/mino';

interface FropBlockGroupProps {
  droppingPhase: number;
  frequency: number;
  onDrop: (mino: Mino, shape: Shape) => void;
}

const DropBlockGroup: React.VFC<FropBlockGroupProps> = ({
  droppingPhase,
  frequency,
  onDrop,
}) => {
  const { useEffect } = React;
  const { currentMino, shiftPool } = useMinoDropManager();

  useEffect(() => {
    shiftPool();
  }, [])

  return (
    currentMino ?
    <BlockGroup
      shape={currentMino}
      centerPosX={5}
      centerPosY={droppingPhase}
      frequency={frequency}
      onDrop={onDrop}
      />
    : null
  )
}

export default DropBlockGroup;
