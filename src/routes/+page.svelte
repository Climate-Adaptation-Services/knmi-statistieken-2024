<script>
  import SidePanel from '$lib/components/SidePanel.svelte'
  import Map from '$lib/components/Map.svelte'
  import Graph from '$lib/components/Graph.svelte'
</script>

<div class='container'>
  <div class='side-panel'>
    <SidePanel />
  </div>
  <div class='map'>
    <Map />
  </div>
  <div class='graph'>
    <Graph />
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
    width:37%;
  }

</style>
