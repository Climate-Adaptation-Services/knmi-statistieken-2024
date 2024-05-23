<script>
  import SidePanel from '$lib/components/SidePanel.svelte'
  import Map from '$lib/components/Map.svelte'
  import Graph from '$lib/components/Graph.svelte'
  import { colorScale, indicatorData } from '$lib/stores.js';

  export let data
  indicatorData.set(data)

  const getData = (async () => {
		const response = await Promise.all([
      fetch('https://cartomap.github.io/nl/wgs84/provincie_2024.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/tropdagen_ref_cellen.geojson'),
      // fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagtekort_laag_2050_2100.geojson'),
      // fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagtekort_2050HD.geojson'),
      // fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagtekort_2100HD.geojson')
    ])
    return [await response[0].json(), await response[1].json()]
	})()

  let mapWidth;
  let mapHeight;
  let sidepanelWidth;
  let sidepanelHeight;
  let legendWidth;

</script>

<div class='container'>
  <div class='side-panel' bind:clientWidth={sidepanelWidth} bind:clientHeight={sidepanelHeight}>
    <SidePanel w={sidepanelWidth} h={sidepanelHeight}/>
  </div>
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
        <Graph w={mapWidth} h={mapHeight}/>
      {/if}
    </div>
  {:catch error}
    <p>An error occurred!</p>
  {/await}
</div>


<style>
  .container{
    height: 100%;
  }

  .side-panel, .map, .graph, .legend{
    float:left;
    height:100%;
  }

  .side-panel{
    width:22%;
    /* border-right: 2px solid grey; */
  }
  .map{
    width:39%;
  }
  .graph{
    width:38%;
  }

</style>
