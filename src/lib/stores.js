import { writable, derived, readable } from "svelte/store"
import { t } from '$lib/i18n/translate';

// huidige taal
export const lang = writable('')

// alleen brabant?
export const brabantKEA = writable(true)

// circle shapes
export const circleFeatures = writable(null)
// only the indicator name
export const indicatorSelection = writable('');
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
export const themeSelection = writable('Hitte')
export const temperatuurIndicatoren = writable([])
export const neerslagIndicatoren = writable([])
export const period_options = writable([]);
export const indicatorOptions = writable(null)


export const gridcode = derived(
  [brabantKEA],
  ([$brabantKEA]) => $brabantKEA ? 'cellen_lat' : 'cellen_lat_lon_XYTableToPoint1_cellen'
);

export const locationName = derived(
  [gridSelection, circleFeatures, gridcode],
  ([$gridSelection, $circleFeatures, $gridcode]) => {
    if (!$circleFeatures) return null;
    const feature = $circleFeatures.filter((f) => f.properties[$gridcode] === $gridSelection)[0];
    return feature ? feature.properties.gemeentenaam : null;
  }
)


export const indicatorSelectionMetaData = derived(
  [indicatorMetaData, indicatorSelection],
  ([$indicatorMetaData, $indicatorSelection]) =>{
    return $indicatorMetaData.filter((ind) => ind['Indicator'] === $indicatorSelection)[0]
  }
)

export const periodName = derived(
  [periodSelection],
  ([$periodSelection]) => ($periodSelection === 'ref')
    ? t('Huidig klimaat')
    : ($periodSelection === '2100hoog' || $periodSelection === '2100laag')
      ? '2100'
      : '2050'
)

export const graphW = derived(
  [themeSelection],
  ([$themeSelection]) => ($themeSelection === t('Zeespiegelstijging'))
    ? '75%'
    : '38%'
)

export const gridSelectionValue = derived(
  [indicatorData, gridSelection, periodSelection, indicatorSelection, neerslagIndicatoren],
  ([$indicatorData, $gridSelection, $periodSelection, $indicatorSelection, $neerslagIndicatoren]) => {
    if(!$indicatorSelection || !$indicatorData || $indicatorSelection === t('Zeespiegelstijging') || $neerslagIndicatoren.includes($indicatorSelection)){
      return null
    }else{
      return +$indicatorData[$indicatorSelection].filter(d => +d.index === $gridSelection)[0][$periodSelection]
    }
  }
)

export const gridHoverValue = derived(
  [indicatorData, gridHover, periodSelection, indicatorSelection],
  ([$indicatorData, $gridHover, $periodSelection, $indicatorSelection]) => {
    if(!$indicatorSelection || $gridHover === null){
      return null
    }else{
      return +$indicatorData[$indicatorSelection].filter(d => +d.index === $gridHover)[0][$periodSelection]
    }
  }
)
