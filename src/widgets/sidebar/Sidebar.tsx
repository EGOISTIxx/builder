import { useCallback } from "react";
import { useStore } from "../../app/index.ts";
import { Button } from "../../shared/ui/Button";

export const Toolbar = () => {
  const tool = useStore((s) => s.tool);
  const setTool = useStore((s) => s.setTool);

  const handleClickSelect = useCallback(() => setTool("select"), [setTool]);
  const handleClickWall = useCallback(() => setTool("wall"), [setTool]);
  const handleClickWindow = useCallback(() => setTool("window"), [setTool]);

  const store = useStore.getState();
  console.log(store);

  return (
    <div className="flex flex-col gap-2">
      <Button active={tool === "select"} onClick={handleClickSelect}>
        Select
      </Button>

      <Button active={tool === "wall"} onClick={handleClickWall}>
        Wall
      </Button>

      <Button active={tool === "window"} onClick={handleClickWindow}>
        Window
      </Button>
    </div>
  );
};
