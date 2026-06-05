export type Tool = "select" | "wall" | "window";

export type UiSlice = {
  tool: Tool;
  setTool: (tool: Tool) => void;
};

export const createUiSlice = (set): UiSlice => ({
  tool: "select",
  setTool: (tool) => set({ tool }),
});
