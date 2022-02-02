import * as React from 'react';
import { useTick, Graphics, Container } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import Block from './atoms/block';

let i = 0;
let phaseDurationNum = 0;

const Tetoris = () => {
  const { useCallback, useState } = React;
  const [phase, setPhase] = useState(0);
  useTick(delta => {
    i += 0.25 * delta;
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

  return (
    <Container position={[0, 0]}>
      <Graphics draw={draw} />
      <Block posY={phase} />
    </Container>
  )
}

export default Tetoris;
