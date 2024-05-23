import { writable, derived } from "svelte/store"

export const indicatorData = writable(null)
export const gridSelection = writable(689)
export const colorScale = writable(null)
export const periodSelection = writable('ref')
export const gridHover = writable(null)

export const gridSelectionValue = derived(
  [indicatorData, gridSelection, periodSelection],
  ([$indicatorData, $gridSelection, $periodSelection]) => {
    return +$indicatorData.tropische_dagen.filter(d => +d.index === $gridSelection)[0][$periodSelection]
  }
)

export const gridHoverValue = derived(
  [indicatorData, gridHover, periodSelection],
  ([$indicatorData, $gridHover, $periodSelection]) => {
    if($gridHover === null){
      return null
    }else{
      return +$indicatorData.tropische_dagen.filter(d => +d.index === $gridHover)[0][$periodSelection]
    }
  }
)
