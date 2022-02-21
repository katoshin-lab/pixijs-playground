import * as React from 'react';
import type { Shape, Shapes } from '../types/mino';
import config from '../config';

export const useMinoDropManager = () => {
  const { useState } = React;
  
  const shuffle = <T extends Shape[]>([...array]: T) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const allMinos = Object.keys(config.shapes) as (keyof Shapes)[]

  const [currentMino, setCurrentMino] = useState<Shape>();
  // 初期状態で2ループ分生成
  const [minoPool, setMinoPool] = useState([...shuffle(allMinos), ...shuffle(allMinos)]);

  const shiftPool = (): void => {
    const copied = [...minoPool];
    const cur = copied.shift();
    if (copied.length === allMinos.length) {
      copied.push(...shuffle(allMinos));
    }
    setCurrentMino(cur);
    setMinoPool(copied);
  }

  return { currentMino, minoPool, shiftPool }
}
