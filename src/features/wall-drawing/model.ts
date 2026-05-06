import { nanoid } from "nanoid";
import { snapToPoints } from "../../shared/lib/snap.ts";
import type { Store } from "../../app/index.ts";

type Point = { x: number; y: number };

type Wall = {
  id: string;
  start: Point;
  end: Point;
};

// собираем все вершины стен (для snap)
function getWallVertices(walls: Wall[]): Point[] {
  const points: Point[] = [];

  for (const w of walls) {
    points.push(w.start);
    points.push(w.end);
  }

  return points;
}

export function startWallDrawing(store: Store, point: Point) {
  store.startDrawing(point);
}

export function finishWallDrawing(store: Store, point: Point) {
  const start = store.tempStart;
  if (!start) return;

  const walls: Wall[] = store.walls;

  // точки для snap
  const vertices = getWallVertices(walls);

  // snap start/end к существующим вершинам
  const snappedStart = snapToPoints(vertices, start);
  const snappedEnd = snapToPoints(vertices, point);

  // создаём стену
  store.addWall({
    id: nanoid(),
    start: snappedStart,
    end: snappedEnd,
  });

  // сбрасываем состояние рисования
  store.cancelDrawing();
}

export function cancelWallDrawing(store: Store) {
  store.cancelDrawing();
}
