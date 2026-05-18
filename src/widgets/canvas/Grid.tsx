// widgets/canvas/Grid.tsx
import type { FC } from "react";
import { Line } from "react-konva";

type TGridProps = {
  width: number;
  height: number;
  camera: {
    x: number;
    y: number;
  };
  zoom: number;
};

const GRID_SIZE = 40;

export const Grid: FC<TGridProps> = (props) => {
  const { width, height, camera, zoom } = props;

  // видимая область
  const startX = Math.floor(-camera.x / zoom / GRID_SIZE) * GRID_SIZE;

  const endX = startX + width / zoom + GRID_SIZE * 2;

  const startY = Math.floor(-camera.y / zoom / GRID_SIZE) * GRID_SIZE;

  const endY = startY + height / zoom + GRID_SIZE * 2;

  const lines = [];

  // вертикальные линии
  for (let x = startX; x < endX; x += GRID_SIZE) {
    lines.push(
      <Line
        key={`v-${x}`}
        points={[x, startY, x, endY]}
        stroke="#ddd"
        strokeWidth={1 / zoom}
      />
    );
  }

  // горизонтальные линии
  for (let y = startY; y < endY; y += GRID_SIZE) {
    lines.push(
      <Line
        key={`h-${y}`}
        points={[startX, y, endX, y]}
        stroke="#ddd"
        strokeWidth={1 / zoom}
      />
    );
  }

  return <>{lines}</>;
};
