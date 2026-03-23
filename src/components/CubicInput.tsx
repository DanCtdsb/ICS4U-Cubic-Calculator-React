import { useState, useEffect } from "react";
import { CubicHistory } from "./components/CubicHistory";
import { CubicEquation } from "./components/CubicEquation";
import { CubicTable } from "./components/CubicTable";

type setResultsType = {
  setResults: (results: {
    p: number;
    q: number;
    shift: number;
    delta: number;
  }) => void;
};

export const CubicInput = ({ setResults }: setResultsType) => {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);
  const [d, setD] = useState<number>(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const p = (3 * a * c - b * b) / (3 * a * a);
    const q =
      (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
    const shift = b / (3 * a); // Depressed cubic substitution: x = t - b/(3a)
    const delta = (q * q) / 4 + (p * p * p) / 27;

    setResults({ p, q, shift, delta });
  };
};
