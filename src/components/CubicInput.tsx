import { useState, useEffect } from "react";
import type { Complex, CubicResults, CoefficientsType } from "../types";

type CubicInputProps = {
  setResults: (results: CubicResults) => void;
  setCoefficients: (results: CoefficientsType) => void;
  onSave: () => void;
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

export const CubicInput = ({
  setResults,
  setCoefficients,
  onSave,
}: CubicInputProps) => {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [d, setD] = useState<string>("");

  useEffect(() => {
    if (!a || !b || !c || !d) {
      return;
    }

    const av = Number(a);
    if (av === 0) {
      return;
    }
    const bv = Number(b);
    const cv = Number(c);
    const dv = Number(d);
    setCoefficients({ av, bv, cv, dv });
    const p = (3 * av * cv - bv * bv) / (3 * av * av);
    const q =
      (27 * av * av * dv - 9 * av * bv * cv + 2 * bv * bv * bv) /
      (27 * av * av * av);
    const shift = bv / (3 * av);
    const delta = (q * q) / 4 + (p * p * p) / 27;

    let root1: number | Complex;
    let root2: number | Complex | undefined;
    let root3: number | Complex | undefined;

    if (Math.abs(delta) < 1e-6) {
      const u = Math.cbrt(-q / 2);
      root1 = 2 * u - shift;
      root2 = -u - shift;
      root3 = -u - shift;
    } else if (delta > 0) {
      const sqrtDeltaReal = Math.sqrt(delta);
      const u = Math.cbrt(-q / 2 + sqrtDeltaReal);
      const v = Math.cbrt(-q / 2 - sqrtDeltaReal);
      const t1: Complex = { re: u + v, im: 0 };
      root1 = cx.sub(t1, { re: shift, im: 0 }).re;
    } else {
      const sqrtDelta: Complex = cx.sqrt({ re: delta, im: 0 });
      const u: Complex = cx.cbrt(cx.add({ re: -q / 2, im: 0 }, sqrtDelta));
      const v: Complex = cx.cbrt(cx.sub({ re: -q / 2, im: 0 }, sqrtDelta));
      const t1: Complex = cx.add(u, v);
      const t2: Complex = cx.add(cx.mul(omega, u), cx.mul(omega2, v));
      const t3: Complex = cx.add(cx.mul(omega2, u), cx.mul(omega, v));
      root1 = cx.sub(t1, { re: shift, im: 0 }).re;
      root2 = cx.sub(t2, { re: shift, im: 0 }).re;
      root3 = cx.sub(t3, { re: shift, im: 0 }).re;
    }
    setResults({ p, q, delta, root1, root2, root3 });
  }, [a, b, c, d]);

  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium text-gray-700">A:</label>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />

      <label className="font-medium text-gray-700">B:</label>
      <input
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />

      <label className="font-medium text-gray-700">C:</label>
      <input
        type="number"
        value={c}
        onChange={(e) => setC(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />

      <label className="font-medium text-gray-700">D:</label>
      <input
        type="number"
        value={d}
        onChange={(e) => setD(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};
