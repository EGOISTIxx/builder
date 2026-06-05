import { useCallback, useState, type FC } from "react";
import { Line } from "react-konva";
import type Konva from "konva";
import { useStore } from "../../app/index";
import type { Wall } from "../../app/wall.slice";
import WallControls from "../../entities/walll/ui/WallControls";

type Props = {
  zoom: number;
};

const WallsLayer: FC<Props> = (props) => {
  const { zoom } = props;

  const [draggingWallId, setDraggingWallId] = useState<string | null>(null);

  const { walls, tool, selectedWallId, selectWall, updateWall } = useStore();

  const handleClickWall = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>, wallId: string) => {
      e.cancelBubble = true; // чтобы событие не всплывало до Stage

      if (tool !== "select") return;

      selectWall(wallId);
    },
    [selectWall, tool]
  );

  const handleClickDragLine = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>, w: Wall) => {
      const dx = e.target.x();
      const dy = e.target.y();

      updateWall(w.id, {
        start: {
          x: w.start.x + dx,
          y: w.start.y + dy,
        },
        end: {
          x: w.end.x + dx,
          y: w.end.y + dy,
        },
      });

      e.target.position({
        x: 0,
        y: 0,
      });

      setDraggingWallId(null);
    },
    [updateWall]
  );

  return (
    <>
      {walls.map((w) => (
        <>
          <Line
            key={w.id}
            draggable={tool === "select" && selectedWallId === w.id}
            points={[w.start.x, w.start.y, w.end.x, w.end.y]}
            stroke={selectedWallId === w.id ? "#2563eb" : "black"}
            strokeWidth={selectedWallId === w.id ? 6 / zoom : 4 / zoom}
            hitStrokeWidth={20 / zoom}
            onClick={(e) => handleClickWall(e, w.id)}
            onDragStart={() => {
              setDraggingWallId(w.id);
            }}
            onDragEnd={(e) => handleClickDragLine(e, w)}
          />

          {selectedWallId === w.id && !draggingWallId && (
            <>
              <WallControls wall={w} zoom={zoom} />
            </>
          )}
        </>
      ))}
    </>
  );
};

export default WallsLayer;
