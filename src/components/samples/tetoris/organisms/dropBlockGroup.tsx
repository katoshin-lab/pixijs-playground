import * as React from 'react';
import BlockGroup from '../molecules/blockGroup';

interface FropBlockGroup {
  droppingPhase: number;
  frequency: number;
  onFinishDrop: () => void
}

const DropBlockGroup: React.VFC<FropBlockGroup> = ({
  droppingPhase,
  frequency
}) => {

  return (
    <BlockGroup
      shape={'t'}
      centerPosX={5}
      centerPosY={droppingPhase}
      frequency={frequency}
    />
  )
}

export default DropBlockGroup;
