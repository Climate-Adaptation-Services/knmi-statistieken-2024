<script>
  import SidePanel from '$lib/components/SidePanel.svelte'
  import Map from '$lib/components/Map.svelte'
  import Graph from '$lib/components/Graph.svelte'

  const getData = (async () => {
		const response = await Promise.all([
      fetch('https://cartomap.github.io/nl/wgs84/provincie_2024.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagtekort_ref.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagtekort_laag_2050_2100.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagtekort_2050HD.geojson'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/Neerslagtekort_2100HD.geojson')
    ])
    return [await response[0].json(), await response[1].json(), await response[2].json(), await response[3].json(), await response[4].json()]
	})()


  let mapWidth;
  let mapHeight;

</script>

<div class='container'>
  <div class='side-panel'>
    <SidePanel />
  </div>
  <div class='map' bind:clientWidth={mapWidth} bind:clientHeight={mapHeight}>
    {#await getData}
      <pre style='color:white'>Loading...</pre>
    {:then res}
      <Map datajson={res} w={mapWidth} h={mapHeight}/>
    {:catch error}
      <p>An error occurred!</p>
    {/await}
  </div>
  <div class='graph'>
    <Graph h={mapHeight}/>
  </div>
</div>


<style>
  .container{
    height: 100%;
  }

  .side-panel, .map, .graph{
    float:left;
    height:100%;
  }

  .side-panel{
    width:26%;
    border-right: 2px solid grey;
  }
  .map{
    width:37%;
  }
  .graph{
    width:36%;
  }

</style>
