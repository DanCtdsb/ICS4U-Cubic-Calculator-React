export type Complex = { re: number; im: number };

export type CubicResults = {
  p: number;
  q: number;
  delta: number;
  root1: number | Complex;
  root2?: number | Complex;
  root3?: number | Complex;
};

export type CoefficientsType = {
  av: number;
  bv: number;
  cv: number;
  dv: number;
};