import * as React from 'react';
import BlockGroup from '../molecules/blockGroup';

interface FropBlockGroup {
  droppingPhase: number;
  onFinishDrop: () => void
}

const DropBlockGroup: React.VFC<FropBlockGroup> = ({
  droppingPhase,
}) => {

  return (
    <BlockGroup shape={'t'} centerPosX={5} centerPosY={droppingPhase} />
  )
}

export default DropBlockGroup;
