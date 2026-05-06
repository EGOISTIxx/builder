import { create } from "zustand";
import { createWallSlice, type WallSlice } from "./wall.slice.ts";
import { createUiSlice, type UiSlice } from "./ui.slice.ts";
import { createCameraSlice, type CameraSlice } from "./camera.slice.ts";
import { createDrawingSlice, type DrawingSlice } from "./drawing.slice.ts";

export type Store = WallSlice & UiSlice & CameraSlice & DrawingSlice;

export const useStore = create<Store>((set, get) => ({
  ...createWallSlice(set),
  ...createUiSlice(set),
  ...createCameraSlice(set),
  ...createDrawingSlice(set, get),
}));
