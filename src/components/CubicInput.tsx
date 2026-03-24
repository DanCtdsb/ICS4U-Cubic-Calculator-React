import { useState, useEffect } from "react";

export type Complex = { re: number; im: number };

export type CubicResults = {
  p: number;
  q: number;
  delta: number;
  root1: number | Complex;
  root2?: number | Complex;
  root3?: number | Complex;
};

export type coefficients = {
  av: number;
  bv: number;
  cv: number;
  dv: number;
};

type setResultsType = {
  setResults: (results: CubicResults) => void;
};

type setCoefficientsType = {
  setCoefficients: (results: coefficients) => void;
};
const cx = {
  add: (z1: Complex, z2: Complex): Complex => ({
    re: z1.re + z2.re,
    im: z1.im + z2.im,
  }),

  sub: (z1: Complex, z2: Complex): Complex => ({
    re: z1.re - z2.re,
    im: z1.im - z2.im,
  }),

  mul: (z1: Complex, z2: Complex): Complex => ({
    re: z1.re * z2.re - z1.im * z2.im,
    im: z1.re * z2.im + z1.im * z2.re,
  }),

  sqrt: (z: Complex): Complex => {
    const r = Math.sqrt(z.re * z.re + z.im * z.im);
    const theta = Math.atan2(z.im, z.re);
    return {
      re: Math.sqrt(r) * Math.cos(theta / 2),
      im: Math.sqrt(r) * Math.sin(theta / 2),
    };
  },

  cbrt: (z: Complex): Complex => {
    const r = Math.hypot(z.re, z.im);
    const theta = Math.atan2(z.im, z.re);
    const mag = Math.cbrt(r);
    return {
      re: mag * Math.cos(theta / 3),
      im: mag * Math.sin(theta / 3),
    };
  },
};

const omega: Complex = { re: -0.5, im: Math.sqrt(3) / 2 };
const omega2: Complex = { re: -0.5, im: -Math.sqrt(3) / 2 };

export const CubicInput = ({ setResults }: setResultsType, {setCoefficients}: setCoefficientsType) => {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [d, setD] = useState<string>("");

  useEffect(() => {
    if (!a || !b || !c || !d) {
      return;
    }

    const av = Number(a);
    const bv = Number(b);
    const cv = Number(c);
    const dv = Number(d);
    setCoefficients({ av, bv, cv, dv });
    const p = (3 * av * cv - bv * bv) / (3 * av * av);
    const q =
      (27 * av * av * dv - 9 * av * bv * cv + 2 * bv * bv * bv) /
      (27 * av * av * av);
    const shift = bv / (3 * av); // Depressed cubic substitution: x = t - b/(3a)
    const delta = (q * q) / 4 + (p * p * p) / 27;

    let root1: number | Complex;
    let root2: number | Complex | undefined;
    let root3: number | Complex | undefined;

    if (Math.abs(delta) < 1e-12) {
      const u = Math.cbrt(-q / 2);
      root1 = 2 * u - shift;
      root2 = -u - shift;
      root3 = -u - shift;
    } else if (delta > 0) {
      const sqrtDeltaReal = Math.sqrt(delta);
      const u = Math.cbrt(-q / 2 + sqrtDeltaReal);
      const v = Math.cbrt(-q / 2 - sqrtDeltaReal);
      const t1: Complex = { re: u + v, im: 0 };
      root1 = cx.sub(t1, { re: shift, im: 0 });
    } else {
      const sqrtDelta: Complex = cx.sqrt({ re: delta, im: 0 });
      const u: Complex = cx.cbrt(cx.add({ re: -q / 2, im: 0 }, sqrtDelta));
      const v: Complex = cx.cbrt(cx.sub({ re: -q / 2, im: 0 }, sqrtDelta));
      const t1: Complex = cx.add(u, v);
      const t2: Complex = cx.add(cx.mul(omega, u), cx.mul(omega2, v));
      const t3: Complex = cx.add(cx.mul(omega2, u), cx.mul(omega, v));
      root1 = cx.sub(t1, { re: shift, im: 0 });
      root2 = cx.sub(t2, { re: shift, im: 0 });
      root3 = cx.sub(t3, { re: shift, im: 0 });
    }
    setResults({ p, q, delta, root1, root2, root3 });
  }, [a, b, c, d]);

  return (
    <div>
      <label htmlFor="a">A:</label>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        required
      />
      <label htmlFor="b">B:</label>
      <input
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        required
      />
      <label htmlFor="c">C:</label>
      <input
        type="number"
        value={c}
        onChange={(e) => setC(e.target.value)}
        required
      />
      <label htmlFor="d">D:</label>
      <input
        type="number"
        value={d}
        onChange={(e) => setD(e.target.value)}
        required
      />
    </div>
  );
};
