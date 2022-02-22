import * as React from 'react';
import BlockGroup from '../molecules/blockGroup';
import type { Mino, Shape } from '../types/mino';
import config from '../config';

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

  const maxY = config.size.board.vertical / config.size.block;

  return (
    currentMino ?
    <BlockGroup
      shape={currentMino}
      centerPosX={5}
      centerPosY={droppingPhase <= maxY / frequency - 1 ? droppingPhase : maxY}
      frequency={frequency}
      onDrop={onDrop}
      />
    : null
  )
}

export default DropBlockGroup;
