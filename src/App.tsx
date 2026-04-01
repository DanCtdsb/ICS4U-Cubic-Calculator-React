import { CubicEquation } from "./components/CubicEquation";
import { CubicGraph } from "./components/CubicGraph";
import { CubicHistory } from "./components/CubicHistory";
import { CubicInput } from "./components/CubicInput";
import { CubicTable } from "./components/CubicTable";
import type { CoefficientsType, CubicResults } from "./types";
import { useState } from "react";

export const App = () => {
  const [results, setResults] = useState<CubicResults | null>(null);
  const [coefficients, setCoefficients] = useState<CoefficientsType | null>(
    null
  );

  const [history, setHistory] = useState<CoefficientsType[]>([]);
  const [resultsHistory, setResultsHistory] = useState<CubicResults[]>([]);

  const handleSave = () => {
    if (!coefficients || !results) {
      return;
    }

    setHistory([...history, coefficients]);
    setResultsHistory([...resultsHistory, results]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Cubic Solver</h1>

      {/* Inputs */}
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 mb-10">
        <CubicInput
          setResults={setResults}
          setCoefficients={setCoefficients}
          onSave={handleSave}
        />
      </div>

      {/* Equation */}
      {coefficients && (
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6 mb-10">
          <CubicEquation coefficients={coefficients} />
        </div>
      )}

      {/* Horizontal Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* History */}
        {coefficients && results && (
          <div className="bg-white shadow-md rounded-lg p-6 h-full">
            <CubicHistory
              setCoefficients={setCoefficients}
              setResults={setResults}
              history={history}
              resultsHistory={resultsHistory}
            />
          </div>
        )}

        {/* Graph */}
        {coefficients && (
          <div className="bg-white shadow-md rounded-lg p-6 h-full">
            <CubicGraph coefficients={coefficients} />
          </div>
        )}

        {/* Results Table */}
        {results && (
          <div className="bg-white shadow-md rounded-lg p-6 h-full">
            <CubicTable results={results} />
          </div>
        )}
      </div>
    </div>
  );
};
