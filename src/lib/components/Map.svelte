<script>
  import { geoMercator, geoPath, extent, scaleLinear, select, selectAll } from 'd3';
  import flip from '@turf/flip'
  import rewind from '@turf/rewind'
  import { gridSelection } from '$lib/stores';
  import { afterUpdate } from 'svelte';

  export let datajson
  export let w
  export let h
  export let NLsteden

  const provincies = datajson[0]
  const neerslagtekort_ref = datajson[1]

  console.log(datajson)

  $: titleHeight = 0.2*h
  $: mapHeight = 0.8*h

  $: projection = geoMercator()
    .fitExtent([[60,10],[w-20, mapHeight - 40]], provincies)
  
  $: path = geoPath(projection);

  const color = scaleLinear()
    .domain(extent(neerslagtekort_ref.features, d => d.properties.gridcode))
    .range(["pink", "red"])

  afterUpdate(() => {select('.gridcode-' + $gridSelection).raise()})

  function click(feature){
    select('.whiterect').interrupt('ease').attr('x', 0)
    gridSelection.set(feature.properties.Id)
  }

</script>

<div class='title' style='height:{titleHeight}px'>
  <h3>Neerslagtekort</h3>
  <p>Pas locatie aan op kaart</p>
</div>
<div class='map-svg' style='height:{mapHeight}px'>
  <svg>
    <g class='provincies'>
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
    </g>
    <g class='rasterdata'>
      {#each neerslagtekort_ref.features as feature, i}
        <path
          d={'M' + path(feature).split('M')[1]}
          class={'gridcode-' + feature.properties.Id}
          fill={color(feature.properties.gridcode)}
          stroke={(feature.properties.Id === $gridSelection) ? 'cyan' : 'white'}
          stroke-width={(feature.properties.Id === $gridSelection) ? '3' : '1'}
          on:click={() => click(feature)}
        />
      {/each}
    </g>
    {#each NLsteden as NLstad, i}
      <g class='NLstad' transform='translate({projection([NLstad.lon, NLstad.lat])[0]},{projection([NLstad.lon, NLstad.lat])[1]})'>
        <circle
          fill={'black'}
          r='3'
        />
        <text font-size='12' x={(NLstad.Stad === 'Haarlem') ? '-30' : '0'} y='1.32em' text-anchor='middle'>
          {NLstad.Stad}
        </text>
      </g>
    {/each}

  </svg>
</div>

<style>
  .title{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .NLstad{
    pointer-events: none;
  }

</style>