import * as React from 'react';
import BlockGroup from '../molecules/blockGroup';
import type { Mino, Shapes } from '../types/mino';

interface FropBlockGroupProps {
  droppingPhase: number;
  frequency: number;
  onDrop: (mino: Mino, shape: Shapes) => void;
}

const DropBlockGroup: React.VFC<FropBlockGroupProps> = ({
  droppingPhase,
  frequency,
  onDrop
}) => {

  return (
    <BlockGroup
      shape={'t'}
      centerPosX={5}
      centerPosY={droppingPhase}
      frequency={frequency}
      onDrop={onDrop}
    />
  )
}

export default DropBlockGroup;
