import { writable, derived } from "svelte/store"

export const indicatorData = writable(null)
export const gridSelection = writable(465)
export const colorScale = writable(null)
export const periodSelection = writable('ref')

export const gridSelectionValue = derived(
  [indicatorData, gridSelection, periodSelection],
  ([$indicatorData, $gridSelection, $periodSelection]) => {
    return +$indicatorData.tropische_dagen.filter(d => +d.index === $gridSelection)[0][$periodSelection]
  }
)
