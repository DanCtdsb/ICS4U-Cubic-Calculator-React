import type { CoefficientsType } from "../types";

type CubicEquationProps = {
  coefficients: CoefficientsType;
};

export const CubicEquation = ({ coefficients }: CubicEquationProps) => {
  const t = [];
  const { av, bv, cv, dv } = coefficients;

  t.push(av === 1 ? "x³" : `${av}x³`);
  if (bv !== 0)
    t.push(
      `${bv > 0 ? "+" : "-"} ${Math.abs(bv) === 1 ? "x²" : Math.abs(bv) + "x²"}`,
    );

  if (cv !== 0)
    t.push(
      `${cv > 0 ? "+" : "-"} ${Math.abs(cv) === 1 ? "x" : Math.abs(cv) + "x"}`,
    );
    
  if (dv !== 0)
    t.push(`${dv > 0 ? "+" : "-"} ${Math.abs(dv)}`);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-800">
        {t.join(" ")}
      </h1>
    </div>
  );
};
