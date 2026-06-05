export type SelectionSlice = {
  selectedWallId: string | null
  selectWall: (id: string | null) => void
}

export const createSelectionSlice = (set): SelectionSlice => ({
  selectedWallId: null,
  selectWall: (id) =>
    set({
      selectedWallId: id,
    }),
})