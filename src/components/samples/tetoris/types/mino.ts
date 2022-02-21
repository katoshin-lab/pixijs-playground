export type Block = { x: number, y: number };
export type Mino = Block[];

export type Shape = 't' | 'i' | 'o' | 'l' | 'j' | 's' | 'z';
export type Shapes = { [key in Shape]: Mino }

export type Stack = (Shape | null)[][]
