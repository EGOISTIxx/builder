type Point = { x: number; y: number };

export type DrawingSlice = {
  isDrawing: boolean;
  tempStart: Point | null;

  startDrawing: (p: Point) => void;
  finishDrawing: (p: Point) => void;
  cancelDrawing: () => void;
};

export const createDrawingSlice = (set, get): DrawingSlice => ({
  isDrawing: false,
  tempStart: null,

  startDrawing: (p) =>
    set({
      isDrawing: true,
      tempStart: p,
    }),

  finishDrawing: (p) => {
    const start = get().tempStart;
    if (!start) return;

    const { addWall } = get();

    addWall({
      id: crypto.randomUUID(),
      start,
      end: p,
    });

    set({
      isDrawing: false,
      tempStart: null,
    });
  },

  cancelDrawing: () =>
    set({
      isDrawing: false,
      tempStart: null,
    }),
});
