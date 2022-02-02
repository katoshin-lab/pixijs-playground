import * as React from 'react';
import { Container, Sprite, useTick} from '@inlet/react-pixi';

const img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png';

let i = 0;

const Rotate = () => {
  const { useState } = React;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [r, setR] = useState(0);

  useTick(delta => {
    i += 0.05 * delta;
    console.log(i)
    setX(Math.sin(i) * 100);
    setY(Math.sin(i / 1.5) * 100);
    setR(-10 + Math.sin(i/10 + Math.PI * 2) * 10)
  })

  return (
    <Container position={[150, 150]}>
      <Sprite
        anchor={0.5}
        x={x - 75}
        y={y - 75}
        rotation={r}
        image={img}
      />
      <Sprite
        anchor={0.5}
        x={x}
        y={y}
        rotation={r}
        image={img}
      />
      <Sprite
        anchor={0.5}
        x={x + 75}
        y={y + 75}
        rotation={r}
        image={img}
      />
    </Container>
  )
}

export default Rotate;
