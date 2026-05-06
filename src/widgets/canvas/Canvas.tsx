import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { Grid } from "./Grid";
import {
  finishWallDrawing,
  startWallDrawing,
} from "../../features/wall-drawing/model";
import { useStore } from "../../app/index";
import type Konva from "konva";

type Point = { x: number; y: number };

export const Canvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [mouse, setMouse] = useState<Point>({ x: 0, y: 0 });

  const store = useStore();

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleMouseMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();

      if (!point) return;

      setMouse(point);
    },
    []
  );

  const handleClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();

      if (!point) return;

      if (store.tool !== "wall") return;

      if (!store.isDrawing) {
        startWallDrawing(store, point);
      } else {
        finishWallDrawing(store, point);
      }
    },
    [store]
  );

  const previewLine = useMemo(
    () =>
      store.isDrawing && store.tempStart ? (
        <Line
          points={[store.tempStart.x, store.tempStart.y, mouse.x, mouse.y]}
          stroke="blue"
          dash={[6, 4]}
          strokeWidth={2}
        />
      ) : null,
    [mouse.x, mouse.y, store.isDrawing, store.tempStart]
  );

  return (
    <div ref={containerRef} className="w-full h-full">
      <Stage
        width={size.width}
        height={size.height}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      >
        {/* GRID */}
        <Layer>
          <Grid width={size.width} height={size.height} />
        </Layer>

        {/* WALLS */}
        <Layer>
          {store.walls.map((w) => (
            <Line
              key={w.id}
              points={[w.start.x, w.start.y, w.end.x, w.end.y]}
              stroke="black"
              strokeWidth={3}
            />
          ))}

          {/* PREVIEW LINE */}
          {previewLine}
        </Layer>
      </Stage>
    </div>
  );
};
