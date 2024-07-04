import { writable, derived, readable } from "svelte/store"

// circle shapes
export const circleFeatures = writable(null)
// only the indicator name
export const indicatorSelection = writable('Aantal tropische dagen');
// all indicator data
export const indicatorData = writable(null)
// indicator metadata
export const indicatorMetaData = writable(null)
export const gridSelection = writable(689)
export const colorScale = writable(null)
export const gridHover = writable(null)
export const periodSelection = writable('ref')
export const scenarioSelection = writable('beide')
export const regimeSelection = writable('R')
export const graphHover = writable('null')
// Hovered year for zeespiegelstijging
export const hoveredYear = writable(null)
export const themeSelection = writable('Hitte')
export const neerslagIndicatoren = readable(['Uurneerslag - eens per jaar','Uurneerslag - eens per 10 jaar','Uurneerslag - eens per 100 jaar','Uurneerslag - eens per 1000 jaar ','Dagneerslag - eens per jaar','Dagneerslag - eens per 10 jaar','Dagneerslag - eens per 100 jaar','Dagneerslag - eens per 1000 jaar','10-daagse neerslag - eens per jaar','10-daagse neerslag - eens per 10 jaar','10-daagse neerslag - eens per 100 jaar','10-daagse neerslag - eens per 1000 jaar'])
export const period_options = readable([
  { value: 'ref', label: 'Huidig klimaat'},
  { value: '2050laag', label: '2050 laagste scenario'},
  { value: '2050hoog', label: '2050 hoogste scenario'},
  { value: '2100laag', label: '2100 laagste scenario'},
  { value: '2100hoog', label: '2100 hoogste scenario'}
]);

export const indicatorSelectionMetaData = derived(
  [indicatorMetaData, indicatorSelection],
  ([$indicatorMetaData, $indicatorSelection]) =>{
    return $indicatorMetaData.filter((ind) => ind['Indicator'] === $indicatorSelection)[0]
  }
)

export const periodName = derived(
  [periodSelection],
  ([$periodSelection]) => ($periodSelection === 'ref')
    ? 'Huidig klimaat'
    : ($periodSelection === '2100hoog' || $periodSelection === '2100laag')
      ? '2100'
      : '2050'
)

export const gridSelectionValue = derived(
  [indicatorData, gridSelection, periodSelection, indicatorSelection, neerslagIndicatoren],
  ([$indicatorData, $gridSelection, $periodSelection, $indicatorSelection, $neerslagIndicatoren]) => {
    if($indicatorSelection === 'Zeespiegelstijging' || $neerslagIndicatoren.includes($indicatorSelection)){
      return null
    }else{
      return +$indicatorData[$indicatorSelection].filter(d => +d.index === $gridSelection)[0][$periodSelection]
    }
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
