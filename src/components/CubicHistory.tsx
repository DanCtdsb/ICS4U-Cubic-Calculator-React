import type { CoefficientsType } from "../types";
import type { CubicResults } from "../types";

type CubicHistoryProps = {
  setCoefficients: (results: CoefficientsType) => void;
  setResults: (results: CubicResults) => void;
  history: CoefficientsType[];
  resultsHistory: CubicResults[];
};

export const CubicHistory = ({
  setCoefficients,
  setResults,
  history,
  resultsHistory
}: CubicHistoryProps) => {

  return (
    <div className="w-full">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">History</h2>

        <ul className="space-y-2">
          {history.map((entry, index) => (
            <li
              key={index}
              onClick={() => {
                setCoefficients(entry);
                setResults(resultsHistory[index]);
              }}
              className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              {entry.av}, {entry.bv}, {entry.cv}, {entry.dv}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
