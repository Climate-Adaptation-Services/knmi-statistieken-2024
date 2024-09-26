import { lang, indicatorSelection, temperatuurIndicatoren, neerslagIndicatoren, period_options, indicatorMetaData, indicatorData, themeSelection, brabantKEA, gridSelection } from "$lib/stores"
import { t } from "$lib/i18n/translate"
import { get } from "svelte/store"

// setup stores after lang has been set
export function setupStores(data){
  if(data.lang === 'en'){lang.set('en')}
  else{lang.set('nl')}

  if(data.regio === 'brabant'){brabantKEA.set(true)}
  else{brabantKEA.set(false)}

  if(get(brabantKEA)){gridSelection.set(388)}

  indicatorSelection.set(t('Aantal tropische dagen'))
  temperatuurIndicatoren.set([t('Gemiddelde jaartemperatuur'), t('Gemiddelde zomertemperatuur'),t('Gemiddelde wintertemperatuur')])
  neerslagIndicatoren.set([t('Uurneerslag - eens per jaar'),t('Uurneerslag - eens per 10 jaar'),t('Uurneerslag - eens per 100 jaar'), t('Uurneerslag - eens per 1000 jaar'), t('Dagneerslag - eens per jaar'), t('Dagneerslag - eens per 10 jaar'), t('Dagneerslag - eens per 100 jaar'), t('Dagneerslag - eens per 1000 jaar'), t('10-daagse neerslag - eens per jaar'), t('10-daagse neerslag - eens per 10 jaar'), t('10-daagse neerslag - eens per 100 jaar'), t('10-daagse neerslag - eens per 1000 jaar')])
  period_options.set([
    { value: 'ref', label: t('Huidig klimaat')},
    { value: '2050laag', label: t('2050 laagste scenario')},
    { value: '2050hoog', label: t('2050 hoogste scenario')},
    { value: '2100laag', label: t('2100 laagste scenario')},
    { value: '2100hoog', label: t('2100 hoogste scenario')}
  ])

  if(get(lang) === 'nl'){indicatorMetaData.set(data.indicator_metadata)}
  else{indicatorMetaData.set(data.indicator_metadata_english)}

  let indicator_data = {}
  const indicatoren_namen = ['Aantal tropische dagen', 'Reeks droge dagen', 'Reeks zomerse dagen', 'Aantal tropische nachten', 'Aantal vorstdagen', 'Aantal warme dagen', 'Aantal zomerse dagen', 'Aantal ijsdagen', 'Aantal dagen ≥ 15 mm', 'Aantal dagen ≥ 25 mm', 'Jaarlijkse neerslag', 'Winterneerslag', 'Zomerneerslag', 'Gemiddelde jaartemperatuur', 'Gemiddelde wintertemperatuur', 'Gemiddelde zomertemperatuur', 'Koelgraaddagen', 'Verwarmingsgraaddagen', 'Lengte groeiseizoen', 'Aantal extreem hete dagen', 'Jaarlijkse referentieverdamping', 'Maximaal neerslagtekort', 'Zeespiegelstijging', '10-daagse neerslag - eens per jaar', '10-daagse neerslag - eens per 10 jaar', '10-daagse neerslag - eens per 100 jaar', '10-daagse neerslag - eens per 1000 jaar', 'Dagneerslag - eens per jaar', 'Dagneerslag - eens per 10 jaar', 'Dagneerslag - eens per 100 jaar', 'Dagneerslag - eens per 1000 jaar', 'Uurneerslag - eens per jaar', 'Uurneerslag - eens per 10 jaar', 'Uurneerslag - eens per 100 jaar', 'Uurneerslag - eens per 1000 jaar']
  for(let i=0;i<indicatoren_namen.length;i++){
    indicator_data[t(indicatoren_namen[i])] = data.response[i]
  }

  indicatorData.set(indicator_data)
}