import type { CoefficientsType } from "../types";
import { useRef, useEffect } from "react";

type CoefficientsTypeProp = {
  coefficients: CoefficientsType;
};

export const CubicGraph = ({ coefficients }: CoefficientsTypeProp) => {
  const { av, bv, cv, dv } = coefficients;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const width = Number(canvasRef.current?.width);
    const height = Number(canvasRef.current?.height);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    const x0 = width / 2;
    const y0 = height / 2;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.lineTo(width, y0);
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, height);

    for (let i = 10; i <= width; i += 20) {
      ctx.moveTo(i, y0 - 5);
      ctx.lineTo(i, y0 + 5);
    }
    for (let i = 10; i <= height; i += 20) {
      ctx.moveTo(x0 - 5, i);
      ctx.lineTo(x0 + 5, i);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = "#000";
    for (let i = 10; i <= width; i += 20) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
    }
    for (let i = 10; i <= height; i += 20) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0055cc";

    const scaleX = 20;
    const scaleY = 20;
    let first = true;

    for (let px = 0; px <= width; px++) {
      const x = (px - x0) / scaleX;
      const y = av * x * x * x + bv * x * x + cv * x + dv;
      const py = y0 - y * scaleY;

      if (first) {
        ctx.moveTo(px, py);
        first = false;
      }
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [coefficients]);

  return (
    <div className="flex justify-center items-center">
      <canvas
        width="300"
        height="300"
        ref={canvasRef}
        className="border border-gray-300 rounded shadow-sm"
      ></canvas>
    </div>
  );
};
