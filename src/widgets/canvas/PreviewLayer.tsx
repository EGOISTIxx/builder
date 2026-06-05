import { useMemo, type FC } from "react";
import { Line } from "react-konva";
import { useStore } from "../../app/index";
import { lockAngle } from "../../shared/lib/geometry";

type Props = {
  mouse: { x: number; y: number };
}

const PreviewLayer: FC<Props> = (props) => {
  const { mouse } = props;
  const { isDrawing, tempStart, zoom } = useStore();

  const lockedPoint = useMemo(
    () => (isDrawing && tempStart ? lockAngle(tempStart, mouse, 15) : mouse),
    [isDrawing, mouse, tempStart]
  );

  return (
    <>
      {isDrawing && tempStart ? (
        <Line
          points={[tempStart.x, tempStart.y, lockedPoint.x, lockedPoint.y]}
          stroke="blue"
          strokeWidth={2 / zoom}
          dash={[8 / zoom, 4 / zoom]}
        />
      ) : null}
    </>
  );
};

export default PreviewLayer;
