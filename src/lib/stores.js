import { writable, derived, readable } from "svelte/store"

// circle shapes
export const circleFeatures = writable(null)
// only the indicator name
export const indicatorSelection = writable('Number of tropical days');
// all indicator data
export const indicatorData = writable(null)
// indicator metadata
export const indicatorMetaData = writable(null)

// Tooltip info
export const hoveredInfo = writable(null)
export const mousePosition = writable(null)

export const modal = writable(null);

export const gridSelection = writable(689)
export const colorScale = writable(null)
export const gridHover = writable(null)
export const periodSelection = writable('ref')
export const scenarioSelection = writable('beide')
export const regimeSelection = writable('R')
export const graphHover = writable('null')
// Hovered year for zeespiegelstijging
export const hoveredYear = writable(null)
export const themeSelection = writable('Heat')
export const temperatuurIndicatoren = readable(['Average annual temperature', 'Average summer temperature','Average winter temperature'])
export const neerslagIndicatoren = readable(['10-day precipitation - once per year', '10-day precipitation - once per 10 years', '10-day precipitation - once per 100 years', '10-day precipitation - once per 1000 years', 'Daily precipitation - once per year', 'Daily precipitation - once per 10 years', 'Daily precipitation - once per 100 years', 'Daily precipitation - once per 1000 years', 'Hourly precipitation - once per year', 'Hourly precipitation - once per 10 years', 'Hourly precipitation - once per 100 years', 'Hourly precipitation - once per 1000 years'])
export const period_options = readable([
  { value: 'ref', label: 'Current climate'},
  { value: '2050laag', label: '2050 lowest scenario'},
  { value: '2050hoog', label: '2050 highest scenario'},
  { value: '2100laag', label: '2100 lowest scenario'},
  { value: '2100hoog', label: '2100 highest scenario'}
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
    ? 'Current climate'
    : ($periodSelection === '2100hoog' || $periodSelection === '2100laag')
      ? '2100'
      : '2050'
)

export const gridSelectionValue = derived(
  [indicatorData, gridSelection, periodSelection, indicatorSelection, neerslagIndicatoren],
  ([$indicatorData, $gridSelection, $periodSelection, $indicatorSelection, $neerslagIndicatoren]) => {
    if($indicatorSelection === 'Sea level rise' || $neerslagIndicatoren.includes($indicatorSelection)){
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
