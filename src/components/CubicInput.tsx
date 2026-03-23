import { useState, useEffect } from "react";

type setResultsType = {
  setResults: (results: {
    p: number;
    q: number;
    shift: number;
    delta: number;
  }) => void;
};

export const CubicInput = ({ setResults }: setResultsType) => {

  const [a, setA] = useState<number> | ;
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);
  const [d, setD] = useState<number>(0);

  const 
   handleFormSubmit = (e: React.FormEvent) => { e.preventDefault();

    const p = (3 * a * c - b * b) / (3 * a * a);
    const q =
      (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
    const shift = b / (3 * a); // Depressed cubic substitution: x = t - b/(3a)
    const delta = (q * q) / 4 + (p * p * p) / 27;

    setResults({ p, q, shift, delta });
  };

  return (
    <div>
      <label htmlFor="a">A:</label>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
        required
      />
      <label htmlFor="b">B:</label>
      <input
        type="number"
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
        required
      />
      <label htmlFor="c">C:</label>
      <input
        type="number"
        value={c}
        onChange={(e) => setC(Number(e.target.value))}
        required
      />
      <label htmlFor="d">D:</label>
      <input
        type="number"
        value={d}
        onChange={(e) => setD(Number(e.target.value))}
        required
      />
    </div>
  );
};
