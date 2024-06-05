import { writable, derived } from "svelte/store"

export const indicatorSelection = writable('Tropische dagen');
export const indicatorData = writable(null)
export const indicatorMetaData = writable(null)
export const gridSelection = writable(689)
export const colorScale = writable(null)
export const gridHover = writable(null)
export const periodSelection = writable('ref')
export const scenarioSelection = writable('beide')
export const themeSelection = writable('Hitte')

export const periodName = derived(
  [periodSelection],
  ([$periodSelection]) => ($periodSelection === 'ref')
    ? 'Huidig klimaat'
    : ($periodSelection === '2100hoog')
      ? 'Klimaat 2100'
      : 'Klimaat 2050'
)

export const gridSelectionValue = derived(
  [indicatorData, gridSelection, periodSelection, indicatorSelection],
  ([$indicatorData, $gridSelection, $periodSelection, $indicatorSelection]) => {
    return +$indicatorData[$indicatorSelection].filter(d => +d.index === $gridSelection)[0][$periodSelection]
  }
)

export const gridHoverValue = derived(
  [indicatorData, gridHover, periodSelection, indicatorSelection],
  ([$indicatorData, $gridHover, $periodSelection, $indicatorSelection]) => {
    if($gridHover === null){
      return null
    }else{
      return +$indicatorData[$indicatorSelection].filter(d => +d.index === $gridHover)[0][$periodSelection]
    }
  }
)
