import { t } from '$lib/i18n/translate';
import { scaleLinear } from 'd3';
import { indicatorSelection, colorScale,indicatorSelectionMetaData, regimeSelection } from '$lib/stores';
import { get } from 'svelte/store';

export function onChangeIndicator(indicatorName){
  // als wissel van winter naar jaar regimes
  if(get(indicatorSelection).slice(0,18) === t('10-daagse neerslag - eens per jaar').slice(0,18) && indicatorName.slice(0,18) !== t('10-daagse neerslag - eens per jaar').slice(0,18)){regimeSelection.set('L')}

  console.log('indicatorName', indicatorName)
  indicatorSelection.set(indicatorName)

  const domain = get(indicatorSelectionMetaData)['y-as domein'].split(',')
  const range = get(indicatorSelectionMetaData)['Kleuren'].split(',')
  
  colorScale.set(
    scaleLinear()
    .domain(domain)
    .range(range)
  )
}