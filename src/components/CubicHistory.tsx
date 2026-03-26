import type { CoefficientsType } from "./CubicInput";
import { useState } from "react";

type SetCoefficientsType = {
  setCoefficients: (results: CoefficientsType) => void;
  coefficients: CoefficientsType;
};

export const CubicHistory = ({
  setCoefficients,
  coefficients,
}: SetCoefficientsType) => {
  const [history, setHistory] = useState<CoefficientsType[]>([]);

  const { av, bv, cv, dv } = coefficients;

  return (
    <div>
      <button onClick={() => setHistory([...history, { av, bv, cv, dv }])}>
        Save
      </button>
      <div>
        <h2>History</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index} onClick={() => setCoefficients(entry)}>
              {entry.av}, {entry.bv}, {entry.cv}, {entry.dv}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
