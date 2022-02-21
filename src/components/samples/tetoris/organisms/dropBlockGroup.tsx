import * as React from 'react';
import BlockGroup from '../molecules/blockGroup';
import type { Mino, Shape } from '../types/mino';

interface FropBlockGroupProps {
  currentMino: Shape | undefined;
  droppingPhase: number;
  frequency: number;
  onDrop: (mino: Mino) => void;
}

const DropBlockGroup: React.VFC<FropBlockGroupProps> = ({
  currentMino,
  droppingPhase,
  frequency,
  onDrop,
}) => {

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
