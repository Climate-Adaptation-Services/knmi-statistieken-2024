<script>
  import SidePanel from '$lib/components/SidePanel.svelte'
  import Map from '$lib/components/Map.svelte'
  import Graph from '$lib/components/Graph.svelte'
  import { colorScale, indicatorData, indicatorMetaData, indicatorSelection, modal, lang } from '$lib/stores.js';
  import IndicatorExplanation from '$lib/components/IndicatorExplanation.svelte';
  import Zeespiegelstijging from '$lib/components/Zeespiegelstijging.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import Modal from 'svelte-simple-modal';
  import { t } from '$lib/i18n/translate';

  export let data
  $: console.log(data)


  if(data.lang === 'en'){
    lang.set('en')
  }else{
    lang.set('nl')
  }

  let indicator_data = {}
  const indicatoren_namen = ['Aantal tropische dagen', 'Reeks droge dagen', 'Reeks zomerse dagen', 'Aantal tropische nachten', 'Aantal vorstdagen', 'Aantal warme dagen', 'Aantal zomerse dagen', 'Aantal ijsdagen', 'Aantal dagen ≥ 15 mm', 'Aantal dagen ≥ 25 mm', 'Jaarlijkse neerslag', 'Winterneerslag', 'Zomerneerslag', 'Gemiddelde jaartemperatuur', 'Gemiddelde wintertemperatuur', 'Gemiddelde zomertemperatuur', 'Koelgraaddagen', 'Verwarmingsgraaddagen', 'Lengte groeiseizoen', 'Aantal extreem hete dagen', 'Jaarlijkse referentieverdamping', 'Maximaal neerslagtekort', '10-daagse neerslag - eens per jaar', '10-daagse neerslag - eens per 10 jaar', '10-daagse neerslag - eens per 100 jaar', '10-daagse neerslag - eens per 1000 jaar', 'Dagneerslag - eens per jaar', 'Dagneerslag - eens per 10 jaar', 'Dagneerslag - eens per 100 jaar', 'Dagneerslag - eens per 1000 jaar', 'Uurneerslag - eens per jaar', 'Uurneerslag - eens per 10 jaar', 'Uurneerslag - eens per 100 jaar', 'Uurneerslag - eens per 1000 jaar']
  for(let i=0;i<indicatoren_namen.length;i++){
    indicator_data[t(indicatoren_namen[i])] = data.response[i]
  }

  console.log(indicator_data)

  indicatorData.set(indicator_data)
  indicatorMetaData.set(data.indicator_metadata)

  const getData = (async () => {
		const response = await Promise.all([
      fetch('https://cartomap.github.io/nl/wgs84/provincie_2024.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Punten_KNMImasker.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/NLgrenzen.json'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagregime_WINTER.json'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagregime_JAAR-large.json')
    ])
    return [await response[0].json(), await response[1].json(), await response[2].json(), await response[3].json(), await response[4].json()]
	})()

  let mapWidth;
  let mapHeight;
  let sidepanelWidth;
  let sidepanelHeight;

</script>

<div class='container'>
  {#if $indicatorData}
    {#if data}
      <div class='side-panel' bind:clientWidth={sidepanelWidth} bind:clientHeight={sidepanelHeight}>
        <SidePanel w={sidepanelWidth} h={sidepanelHeight}/>
      </div>
    {/if}
    {#await getData}
      <pre style='color:white'>Loading...</pre>
    {:then res}
      <div class='map' bind:clientWidth={mapWidth} bind:clientHeight={mapHeight}>
        {#if mapWidth && data}
          <Map datajson={res} w={mapWidth} h={mapHeight} NLsteden={data.NLsteden} />
        {/if}
      </div>
      <div class='graph'>
        {#if mapWidth}
          {#if $indicatorSelection !== 'Zeespiegelstijging'}
            <Graph w={mapWidth} h={mapHeight}/>
          {:else}
            <Zeespiegelstijging w={mapWidth} h={mapHeight} dataProjection={$indicatorData['Zeespiegelstijging']}/>
          {/if}
        {/if}
      </div>
    {:catch error}
      <p>An error occurred!</p>
    {/await}
    <div class='indicator-explanation'>
      <IndicatorExplanation />
    </div>

    <Tooltip />
    
    <Modal show={$modal} style='position:absolute; left:0'></Modal>
  {/if}
</div>


<style>
  .container{
    height: 100%;
  }

  .side-panel{
    float:left;
    height:100%;
    width:22%;
  }

  .map, .graph{
    height:82%;
    float:left;
  }

  .map{
    width:39%;
  }
  .graph{
    width:38%;
  }

  .indicator-explanation{
    width:77%;
    height:18%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
