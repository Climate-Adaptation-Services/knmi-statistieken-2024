<script>
  import { geoMercator, geoPath, scaleOrdinal, schemeAccent } from 'd3';
  import flip from '@turf/flip'
  import rewind from '@turf/rewind'

  export let datajson
  export let w
  export let h

  const provincies = datajson[0]
  const neerslagtekort_ref = datajson[1]

  console.log(datajson)

  $: titleHeight = 0.2*h
  $: mapHeight = 0.8*h

  $: projection = geoMercator()
    .fitExtent([[10,10],[w-20, mapHeight - 20]], provincies)
  
  $: path = geoPath(projection);

  const color = scaleOrdinal(schemeAccent);

</script>

<div class='title' style='height:{titleHeight}px'>
  <h3>Neerslagtekort</h3>
  <p>Pas locatie aan op kaart</p>
</div>
<div class='map-svg' style='height:{mapHeight}px'>
  <svg>
    {#each provincies.features as feature}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <path
        d={path(feature)}
        class='shape'
        fill='white'
        stroke='grey'
      />
    {/each}
    <!-- {#each neerslagtekort_ref.features as feature, i}
    <path
      d={path(feature)}
      class='shape'
      fill={color(i)}
      stroke='grey'
    />
    {/each} -->

  </svg>
</div>

<style>
  .title{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>