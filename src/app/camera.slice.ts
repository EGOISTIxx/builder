export type CameraSlice = {
  zoom: number;
  camera: {
    x: number;
    y: number;
  };
  setZoom: (zoom: number) => void;
  moveCamera: (dx: number, dy: number) => void;
  setCamera: (x: number, y: number) => void;
};

export const createCameraSlice = (set): CameraSlice => ({
  zoom: 1,
  camera: {
    x: 0,
    y: 0,
  },
  setZoom: (zoom) =>
    set({
      zoom,
    }),
  moveCamera: (dx, dy) =>
    set((state) => ({
      camera: {
        x: state.camera.x + dx,
        y: state.camera.y + dy,
      },
    })),
  setCamera: (x, y) =>
    set({
      camera: {
        x,
        y,
      },
    }),
});
