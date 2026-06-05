import { useCallback, useRef, useState } from "react";
import type Konva from "konva";
import { useStore } from "../../../app/index";
import {
  finishWallDrawing,
  startWallDrawing,
} from "../../../features/wall-drawing/model";
import { lockAngle } from "../../../shared/lib/geometry";

type Point = { x: number; y: number };

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 4;
const ZOOM_SPEED = 1.05;

export const useCamera = () => {
  const [mouse, setMouse] = useState<Point>({ x: 0, y: 0 });

  const [isPanning, setIsPanning] = useState(false);

  const lastPointer = useRef<Point | null>(null);

  const store = useStore();

  const {
    camera,
    zoom,
    tool,
    isDrawing,
    tempStart,
    moveCamera,
    setZoom,
    setCamera,
  } = store;

  const toWorldPoint = useCallback(
    (point: Point): Point => {
      return {
        x: (point.x - camera.x) / zoom,
        y: (point.y - camera.y) / zoom,
      };
    },
    [camera.x, camera.y, zoom]
  );

  const handleMouseMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();

      const pointer = stage.getPointerPosition();

      if (!pointer) return;

      // pan camera
      if (isPanning && lastPointer.current) {
        const dx = pointer.x - lastPointer.current.x;
        const dy = pointer.y - lastPointer.current.y;

        moveCamera(dx, dy);
      }

      lastPointer.current = pointer;

      const worldPoint = toWorldPoint(pointer);

      setMouse(worldPoint);
    },
    [isPanning, moveCamera, toWorldPoint]
  );

  const handleMouseDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      // средняя кнопка мыши (колёсико)
      if (e.evt.button === 1) {
        setIsPanning(true);
      }
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback(
    (e: Konva.KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();

      const stage = e.target.getStage();

      const pointer = stage.getPointerPosition();

      if (!pointer) return;

      const oldZoom = zoom;

      const direction = e.evt.deltaY > 0 ? -1 : 1;

      const newZoom =
        direction > 0 ? oldZoom * ZOOM_SPEED : oldZoom / ZOOM_SPEED;

      const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));

      const mouseWorldX = (pointer.x - camera.x) / oldZoom;
      const mouseWorldY = (pointer.y - camera.y) / oldZoom;

      const newCameraX = pointer.x - mouseWorldX * clampedZoom;
      const newCameraY = pointer.y - mouseWorldY * clampedZoom;

      setZoom(clampedZoom);

      setCamera(newCameraX, newCameraY);
    },
    [camera.x, camera.y, setCamera, setZoom, zoom]
  );

  const handleClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (isPanning) return;

      const stage = e.target.getStage();

      const pointer = stage.getPointerPosition();

      if (!pointer) return;

      const point = toWorldPoint(pointer);

      if (tool === "select") {
        store.selectWall(null);
        return;
      }

      if (tool !== "wall") return;

      if (!isDrawing) {
        startWallDrawing(store, point);
      } else {
        const locked = tempStart ? lockAngle(tempStart, point, 15) : point;

        finishWallDrawing(store, locked);
      }
    },
    [isDrawing, isPanning, store, tempStart, toWorldPoint, tool]
  );

  return {
    mouse,
    isPanning,
    handleWheel,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    toWorldPoint,
    handleClick,
  };
};
