import * as React from 'react';
import * as PIXI from 'pixi.js';
import { useTick, Graphics, Container } from '@inlet/react-pixi';
// components
import DropBlockGroup from './organisms/dropBlockGroup';
import StackDrawer from './organisms/stackDrawer';
// hooks
import { useStackManager } from './hooks/stackManager';
import { useMinoDropManager } from './hooks/minoDropManager';
// modules
import config from './config';
// types
import type { Mino } from './types/mino';

let i = 0;
let phaseDurationNum = 0;

const Tetoris = () => {
  const { useCallback, useState, useEffect, useMemo, useRef } = React;
  const { currentMino, shiftPool } = useMinoDropManager();

  // const [level, setLevel] = useState(1);
  const level = 5;
  const frequency = useMemo(() => level <= 3 ? { coefficient: 1, multiply: 1 } : level <= 6 ? { coefficient: 0.5, multiply: 2 } : { coefficient: 0.25, multiply: 4 }, [level])
  const [phase, setPhase] = useState(0);
  useTick(_delta => {
    // levelが1から10までの範囲で、1だとiに0.025,10だとiに1づつ足され、偶数の時にフェーズをカウントする
    i += level * config.level.coefficient * config.speed.coefficient * frequency.multiply
    // console.log(level * config.level.coefficient * config.speed.coefficient * frequency.multiply)
    Math.floor(i) % 2 === 0 && Math.floor(i) !== phaseDurationNum && setPhase(phase + 1);
    phaseDurationNum = Math.floor(i);
  })

  // テトリスの盤面
  const draw = useCallback((g: PIXI.Graphics): void => {
    g.clear();
    g.beginFill(0x232323);
    g.lineStyle(2, 0x2f2f2f);
    g.drawRect(25, 98, config.size.board.horizontal, config.size.board.vertical);
    g.endFill();
  }, [])

  // 落下中かどうか
  const [drop, setDrop] = useState(false);
  // 次にdropを開始するphase
  const [nextDropPhase, setNextDropPhase] = useState<number | null>(0);
  // dropを開始してからのphase数
  const [droppingPhase, setDroppingPhase] = useState(0);
  // ミノをスタックできる状態かどうか
  const stackFlgRef = useRef<boolean | undefined>();
  const { stack, detectCollision, stackMino } = useStackManager();
  useEffect(() => {
    if (drop) {
      shiftPool();
      setDroppingPhase(phase);
      stackFlgRef.current = true;
    } else if (nextDropPhase === null) {
      setNextDropPhase(phase + frequency.multiply);
    }
  }, [drop]);

  useEffect(() => {
    setDrop(true);
  }, []);

  const onDrop = (mino: Mino): void => {
    const isCollision = detectCollision(mino);
    if (isCollision && stackFlgRef.current) {
      stackFlgRef.current = false;
      stackMino(mino, currentMino);
      setDrop(false);
    };
  };

  useEffect(() => {
    if (!drop && phase === nextDropPhase) {
      setDrop(true);
      setNextDropPhase(null);
    }
  }, [phase])

  return (
    <Container position={[0, 0]}>
      <Graphics draw={draw} />
      { drop &&
        <DropBlockGroup
          currentMino={currentMino}
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
