// widgets/canvas/Grid.tsx
import { Line } from "react-konva";

const GRID_SIZE = 40;

export const Grid = ({ width, height }) => {
  const lines = [];

  // вертикальные линии
  for (let i = 0; i < width / GRID_SIZE; i++) {
    lines.push(
      <Line
        key={`v-${i}`}
        points={[i * GRID_SIZE, 0, i * GRID_SIZE, height]}
        stroke="#ddd"
        strokeWidth={1}
      />
    );
  }

  // горизонтальные линии
  for (let i = 0; i < height / GRID_SIZE; i++) {
    lines.push(
      <Line
        key={`h-${i}`}
        points={[0, i * GRID_SIZE, width, i * GRID_SIZE]}
        stroke="#ddd"
        strokeWidth={1}
      />
    );
  }

  return <>{lines}</>;
};
