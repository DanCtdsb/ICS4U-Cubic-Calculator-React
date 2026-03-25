import type { CubicResults } from "./CubicInput";

type CubicTableProps = {
  results: CubicResults;
};

export const CubicTable = ({ results }: CubicTableProps) => {
  return (
    <table>
      <tr>
        <th>p</th>
        <td>{results.p.toFixed(5)}</td>
      </tr>
      <tr>
        <th>q</th>
        <td>{results.q.toFixed(5)}</td>
      </tr>
      <tr>
        <th>Discriminant</th>
        <td>{results.delta.toFixed(5)}</td>
      </tr>
      <tr>
        <th>Value</th>
        <td>x</td>
        <td>y</td>
      </tr>

      <tr>
        <th>Root 1</th>
        <td>
          {typeof results.root1 === "number"
            ? results.root1.toFixed(5)
            : "Complex Root"}
        </td>
        <td>0</td>
      </tr>
      <tr>
        <th>Root 2</th>
        <td>
          {typeof results.root2 === "number"
            ? results.root2.toFixed(5)
            : "Complex Root"}
        </td>
        <td>{typeof results.root2 === "number" ? 0 : "Complex Root"}</td>
      </tr>
      <tr>
        <th>Root 3</th>
        <td>
          {typeof results.root3 === "number"
            ? results.root3.toFixed(5)
            : "Complex Root"}
        </td>
        <td>{typeof results.root3 === "number" ? 0 : "Complex Root"}</td>
      </tr>
    </table>
  );
};
