import { use } from "react";
import { CubicEquation} from "./components/CubicEquation";
import { CubicGraph } from "./components/CubicGraph";
import { CubicHistory } from "./components/CubicHistory";
import { CubicInput } from "./components/CubicInput";
import { CubicTable } from "./components/CubicTable";
import { useState } from "react";

export App = () => {

  const [results, setResults] = useState(null);

  return (
    <div>
      <CubicInput setResults={setResults} />
      <CubicEquation />
      <CubicGraph />
      <CubicTable />
      <CubicHistory />
    </div>
  );
}