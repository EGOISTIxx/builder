import { useCallback, type FC } from "react";
import { Circle } from "react-konva";
import type Konva from "konva";
import type { Wall } from "../../../app/wall.slice";
import { useStore } from "../../../app/index";

type Props = {
  wall: Wall;
  zoom: number;
};

const WallControls: FC<Props> = (props) => {
  const { wall, zoom } = props;

  const { updateWall } = useStore();

  const handleDragCircle = useCallback((e: Konva.KonvaEventObject<DragEvent>, w: Wall) => {
      updateWall(w.id, {
        start: {
          x: e.target.x(),
          y: e.target.y(),
        },
      });
    }, [updateWall]);

  return (
    <>
      <Circle
        draggable
        x={wall.start.x}
        y={wall.start.y}
        radius={8 / zoom}
        fill="white"
        stroke="#2563eb"
        strokeWidth={2 / zoom}
        onDragMove={(e) => handleDragCircle(e, wall)}
      />

      <Circle
        draggable
        x={wall.end.x}
        y={wall.end.y}
        radius={8 / zoom}
        fill="white"
        stroke="#2563eb"
        strokeWidth={2 / zoom}
        onDragMove={(e) => handleDragCircle(e, wall)}
      />
    </>
  );
};

export default WallControls;
