type Point = { x: number; y: number };

export type Wall = {
  id: string;
  start: Point;
  end: Point;
};

export type WallSlice = {
  walls: Wall[];
  addWall: (wall: Wall) => void;
  updateWall: (id: string, data: Partial<Wall>) => void;
};

export const createWallSlice = (set): WallSlice => ({
  walls: [],
  addWall: (wall) => set((state) => ({ walls: [...state.walls, wall] })),

  updateWall: (id, data) =>
    set((state) => ({
      walls: state.walls.map((w: Wall) => (w.id === id ? { ...w, ...data } : w)),
    })),
});
