import type { CoefficientsType } from "./CubicInput";
import type { CubicResults } from "./CubicInput";
import { useState } from "react";

type SetCoefficientsType = {
  setCoefficients: (results: CoefficientsType) => void;
  coefficients: CoefficientsType;
  setResults: (results: CubicResults) => void;
  results: CubicResults;
};

export const CubicHistory = ({
  setCoefficients,
  coefficients,
  setResults,
  results,
}: SetCoefficientsType) => {
  const [history, setHistory] = useState<CoefficientsType[]>([]);
  const [resultsHistory, setResultsHistory] = useState<CubicResults[]>([]);

  const { av, bv, cv, dv } = coefficients;

  return (
    <div>
      <button
        onClick={() => {
          setHistory([...history, { av, bv, cv, dv }]);
          setResultsHistory([...resultsHistory, results]);
        }}
      >
        Save
      </button>
      <div>
        <h2>History</h2>
        <ul>
          {history.map((entry, index) => (
            <li
              key={index}
              onClick={() => {
                setCoefficients(entry);
                setResults(resultsHistory[index]);
              }}
            >
              {entry.av}, {entry.bv}, {entry.cv}, {entry.dv}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
