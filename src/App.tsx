import { CubicEquation} from "./components/CubicEquation";
import { CubicGraph } from "./components/CubicGraph";
import { CubicHistory } from "./components/CubicHistory";
import { CubicInput } from "./components/CubicInput";
import { CubicTable } from "./components/CubicTable";
import type { CoefficientsType, CubicResults } from "./components/CubicInput";
import { useState } from "react";

export const App = () => {

  const [results, setResults] = useState<CubicResults | null>(null);
  const [coefficients, setCoefficients] = useState<CoefficientsType | null>(null);


  return (
    <div>
      <CubicInput 
      setResults={setResults}
      setCoefficients={setCoefficients}/>
      <CubicEquation coefficients={coefficients}/>
      <CubicGraph />
      <CubicTable results={results}/>
      <CubicHistory />
    </div>
  );
}