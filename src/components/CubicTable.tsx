import type { CubicResults } from "./CubicInput";

type CubicTableProps = {
  results: CubicResults;
};

export const CubicTable = ({ results }: CubicTableProps) => {
  return (
    <table className="w-full border-collapse text-left">
      <tbody className="divide-y divide-gray-300">

        <tr className="bg-gray-50">
          <th className="p-2 font-semibold text-gray-700">p</th>
          <td className="p-2">{results.p.toFixed(5)}</td>
        </tr>

        <tr>
          <th className="p-2 font-semibold text-gray-700">q</th>
          <td className="p-2">{results.q.toFixed(5)}</td>
        </tr>

        <tr className="bg-gray-50">
          <th className="p-2 font-semibold text-gray-700">Discriminant</th>
          <td className="p-2">{results.delta.toFixed(5)}</td>
        </tr>

        <tr>
          <th className="p-2 font-semibold text-gray-700">Value</th>
          <td className="p-2 font-medium">x</td>
          <td className="p-2 font-medium">y</td>
        </tr>

        <tr className="bg-gray-50">
          <th className="p-2 font-semibold text-gray-700">Root 1</th>
          <td className="p-2">
            {typeof results.root1 === "number"
              ? results.root1.toFixed(5)
              : "Complex Root"}
          </td>
          <td className="p-2">0</td>
        </tr>

        <tr>
          <th className="p-2 font-semibold text-gray-700">Root 2</th>
          <td className="p-2">
            {typeof results.root2 === "number"
              ? results.root2.toFixed(5)
              : "Complex Root"}
          </td>
          <td className="p-2">
            {typeof results.root2 === "number" ? 0 : "Complex Root"}
          </td>
        </tr>

        <tr className="bg-gray-50">
          <th className="p-2 font-semibold text-gray-700">Root 3</th>
          <td className="p-2">
            {typeof results.root3 === "number"
              ? results.root3.toFixed(5)
              : "Complex Root"}
          </td>
          <td className="p-2">
            {typeof results.root3 === "number" ? 0 : "Complex Root"}
          </td>
        </tr>

      </tbody>
    </table>
  );
};
