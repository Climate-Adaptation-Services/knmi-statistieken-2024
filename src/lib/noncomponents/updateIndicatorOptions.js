import { indicatorOptions, indicatorMetaData, themeSelection } from "$lib/stores"
import { get } from "svelte/store";
import { t } from '$lib/i18n/translate';

export function updateIndicatorOptions(){
  indicatorOptions.set(get(indicatorMetaData).filter((ind) => ind.Thema === t(get(themeSelection))).map((ind) => {
    let label = ([t('Aantal dagen met neerslagsom >= 15 mm'), t('Aantal dagen met neerslagsom >= 25 mm'),t('Aantal dagen met max temp >= 35')].includes(ind['Indicator'] )) ? capitalizeFirstLetter(ind['Indicator'].slice(7).replace('som','')) : ind['Indicator'] 
    label = (ind['Indicator'] == t('Maximaal neerslagtekort tussen 1 april en 30 september')) ? t('Neerslagtekort april/september') : label
      return {label:label, value:ind['Indicator']}
  }))
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}