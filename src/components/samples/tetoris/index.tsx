import * as React from 'react';
import * as PIXI from 'pixi.js';
import { useTick, Graphics, Container } from '@inlet/react-pixi';
// components
import DropBlockGroup from './organisms/dropBlockGroup';
import StackDrawer from './organisms/stackDrawer';
// hooks
import { useStackManager } from './hooks/stackManager';
// modules
import config from './config';
// types
import type { Mino, Shapes } from './types/mino';

let i = 0;
let phaseDurationNum = 0;

const Tetoris = () => {
  const { useCallback, useState, useEffect, useMemo } = React;

  // const [level, setLevel] = useState(1);
  const level = 4;
  const frequency = useMemo(() => level <= 3 ? { coefficient: 1, multiply: 1 } : level <= 6 ? { coefficient: 0.5, multiply: 2 } : { coefficient: 0.25, multiply: 4 }, [level])
  const [phase, setPhase] = useState(0);
  useTick(_delta => {
    // levelが1から10までの範囲で、1だとiに0.025,10だとiに1づつ足され、偶数の時にフェーズをカウントする
    i += level * config.level.coefficient * config.speed.coefficient * frequency.multiply
    // console.log(level * config.level.coefficient * config.speed.coefficient * frequency.multiply)
    Math.floor(i) % 2 === 0 && Math.floor(i) !== phaseDurationNum && setPhase(phase + 1);
    phaseDurationNum = Math.floor(i);
  })

  const draw = useCallback((g: PIXI.Graphics): void => {
    g.clear();
    g.beginFill(0x232323);
    g.lineStyle(2, 0x2f2f2f);
    g.drawRect(25, 98, config.size.board.horizontal, config.size.board.vertical);
    g.endFill();
  }, [])

  const [drop, setDrop] = useState(false);
  const [nextDropPhase, setNextDropPhase] = useState<number | null>(0);
  const [droppingPhase, setDroppingPhase] = useState(0);
  useEffect(() => {
    if (drop) {
      setDroppingPhase(phase);
    } else if (nextDropPhase === null) {
      setNextDropPhase(phase + frequency.multiply);
    }
  }, [drop]);

  useEffect(() => {
    setDrop(true);
  }, []);

  const { stack, detectCollision, stackMino } = useStackManager();
  const onDrop = useCallback((mino: Mino, shape: Shapes): void => {
    const isCollision = detectCollision(mino);
    if (isCollision) {
      setDrop(false);
      stackMino(mino, shape);
    }
  }, []);

  useEffect(() => {
    if (!drop && phase === nextDropPhase) {
      setDrop(true);
      setNextDropPhase(null);
    }
  }, [phase])

  return (
    <Container position={[0, 0]}>
      <Graphics draw={draw} />
      {drop &&
        <DropBlockGroup
          droppingPhase={phase - droppingPhase}
          onDrop={onDrop}
          frequency={frequency.coefficient}
        />
      }
      <StackDrawer stack={stack} />
    </Container>
  )
}

export default Tetoris;
