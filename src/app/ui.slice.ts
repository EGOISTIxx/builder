export type Tool = "select" | "wall" | "window";

export type UiSlice = {
  selectedId: string | null;
  tool: Tool;

  select: (id: string | null) => void;
  setTool: (tool: Tool) => void;
};

export const createUiSlice = (set): UiSlice => ({
  selectedId: null,
  tool: "select",

  select: (id) => set({ selectedId: id }),
  setTool: (tool) => set({ tool }),
});
