<script>
  import SidePanel from '$lib/components/SidePanel.svelte'
  import Map from '$lib/components/Map.svelte'
  import Graph from '$lib/components/Graph.svelte'
  import IndicatorExplanation from '$lib/components/IndicatorExplanation.svelte';
  import Zeespiegelstijging from '$lib/components/Zeespiegelstijging.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import Modal from 'svelte-simple-modal';
  import { t } from '$lib/i18n/translate';
  import { indicatorData,indicatorSelection, lang, modal, graphW} from '$lib/stores.js';
  import { setupStores } from '$lib/noncomponents/setupStores.js';
  import LoadingIcon from '$lib/components/LoadingIcon.svelte';

  export let data
  $: console.log(data)

  $: console.log('ind data', $indicatorData)

  setupStores(data)

  const getData = (async () => {
		const response = await Promise.all([
      fetch('https://cartomap.github.io/nl/wgs84/provincie_2024.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Punten_KNMImasker.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Punten_KNMImasker_Brabant.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/NLgrenzen.json'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagregime_WINTER.json'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagregime_JAAR-large.json')
    ])
    return [await response[0].json(), await response[1].json(), await response[2].json(), await response[3].json(), await response[4].json(), await response[5].json()]
	})()

  let mapWidth;
  let mapHeight;
  let graphWidth;
  let graphHeight;
  let sidepanelWidth;
  let sidepanelHeight;

</script>

<slot></slot>

<div class='container'>
  {#if $indicatorData && $lang}
    {#if data}
      <div class='side-panel' bind:clientWidth={sidepanelWidth} bind:clientHeight={sidepanelHeight}>
        <SidePanel w={sidepanelWidth} h={sidepanelHeight}/>
      </div>
    {/if}
    {#await getData}
      <LoadingIcon />
    {:then res}
      {#if $indicatorSelection !== t('Zeespiegelstijging')}
        <div class='map' bind:clientWidth={mapWidth} bind:clientHeight={mapHeight}>
          {#if mapWidth && data}
            <Map datajson={res} w={mapWidth} h={mapHeight} NLsteden={data.NLsteden} />
          {/if}
        </div>
      {/if}
      <div class='graph' style='width:{$graphW}' bind:clientWidth={graphWidth} bind:clientHeight={graphHeight}>
        {#if graphWidth}
          {#if $indicatorSelection !== t('Zeespiegelstijging')}
            <Graph w={graphWidth} h={graphHeight}/>
          {:else}
            <Zeespiegelstijging w={graphWidth} h={graphHeight*1.4} dataProjection={$indicatorData[t('Zeespiegelstijging')]}/>
          {/if}
        {/if}
      </div>
      <div class='indicator-explanation'>
        <IndicatorExplanation />
      </div>
    {/await}

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

  .indicator-explanation{
    width:77%;
    height:18%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>


