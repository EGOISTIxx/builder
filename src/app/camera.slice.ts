export type CameraSlice = {
  zoom: number
  offset: { x: number; y: number }

  setZoom: (z: number) => void
  setOffset: (o: { x: number; y: number }) => void
}

export const createCameraSlice = (set): CameraSlice => ({
  zoom: 1,
  offset: { x: 0, y: 0 },

  setZoom: (zoom) => set({ zoom }),
  setOffset: (offset) => set({ offset }),
})