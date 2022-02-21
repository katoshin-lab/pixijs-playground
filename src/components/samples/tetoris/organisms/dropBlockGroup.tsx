import * as React from 'react';
import BlockGroup from '../molecules/blockGroup';
import type { Mino, Shape } from '../types/mino';

interface FropBlockGroupProps {
  droppingPhase: number;
  frequency: number;
  onDrop: (mino: Mino, shape: Shape) => void;
  isDrop: boolean;
}

const DropBlockGroup: React.VFC<FropBlockGroupProps> = ({
  droppingPhase,
  frequency,
  onDrop,
  isDrop
}) => {
  const { useEffect } = React;

  useEffect(() => {
    
  }, [isDrop])

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
