import { Stage, Layer } from "react-konva";
import { Grid } from "./Grid";
import { useStore } from "../../app/index";
import { useCanvasSize } from "./hooks/useCanvasSize";
import WallsLayer from "./WallsLayer";
import PreviewLayer from "./PreviewLayer";
import { useCamera } from "./hooks/useCamera";

export const Canvas = () => {
  const { containerRef, size } = useCanvasSize();

  const {
    mouse,
    handleClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
  } = useCamera();

  const zoom = useStore((s) => s.zoom);
  const camera = useStore((s) => s.camera);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Stage
        width={size.width}
        height={size.height}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleClick}
      >
        <Layer x={camera.x} y={camera.y} scaleX={zoom} scaleY={zoom}>
          {/* GRID */}
          <Grid
            width={size.width}
            height={size.height}
            camera={camera}
            zoom={zoom}
          />

          {/* WALLS */}
          <WallsLayer zoom={zoom} />

          {/* PREVIEW LINE */}
          <PreviewLayer mouse={mouse} />
        </Layer>
      </Stage>
    </div>
  );
};
