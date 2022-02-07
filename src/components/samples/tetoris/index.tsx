import * as React from 'react';
import { useTick, Graphics, Container } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import DropBlockGroup from './organisms/dropBlockGroup';

const LEVEL_CEFFICIENT = 0.12;
const SPEED_COEFFICIENT = 0.7;

let i = 0;
let phaseDurationNum = 0;

const Tetoris = () => {
  const { useCallback, useState, useEffect } = React;

  // const [lecel, setLevel] = useState(1);
  const level = 2;
  const [phase, setPhase] = useState(0);
  useTick(delta => {
    i += level * LEVEL_CEFFICIENT * SPEED_COEFFICIENT * delta;
    Math.floor(i) % 10 === 0 && Math.floor(i) !== phaseDurationNum && setPhase(phase + 1);
    phaseDurationNum = Math.floor(i);
  })

  const draw = useCallback((g: PIXI.Graphics): void => {
    g.clear();
    g.beginFill(0xffffff);
    g.lineStyle(2, 0x000000);
    g.drawRect(25, 98, 400, 800);
    g.endFill();
  }, [])

  const [drop, setDrop] = useState(false);
  const [droppingPhase, setDroppingPhase] = useState(0);
  useEffect(() => {
    if (drop) {
      setDroppingPhase(phase);
    }
  }, [drop])

  useEffect(() => {
    setDrop(true);
  }, [])

  const onFinishDrop = (): void => {
    setDrop(false);
  }

  return (
    <Container position={[0, 0]}>
      <Graphics draw={draw} />
      {drop && <DropBlockGroup droppingPhase={phase - droppingPhase} onFinishDrop={onFinishDrop} />}
    </Container>
  )
}

export default Tetoris;
