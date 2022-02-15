export type Block = { x: number, y: number };
export type Mino = Block[];

export type Shapes = 't' | 'i' | 'o' | 'l' | 'j' | 's' | 'z';

export type Stack = (Shapes | null)[][]
