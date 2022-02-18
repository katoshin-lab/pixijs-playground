import config from '../config';

export type Block = { x: number, y: number };
export type Mino = Block[];

export type Shapes = keyof typeof config.shapes;

export type Stack = (Shapes | null)[][]
