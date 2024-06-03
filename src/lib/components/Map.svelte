<script>
// @ts-nocheck

  import { color, geoMercator, geoPath, scaleLinear, select } from 'd3';
  import { colorScale, gridSelection, periodSelection, indicatorData, gridHover, indicatorSelection, periodName } from '$lib/stores';
  import { afterUpdate } from 'svelte';
  import Legend from './Legend.svelte';

  export let datajson
  export let w
  export let h
  export let NLsteden

  const provincies = datajson[0]
  const cellen = datajson[1];

  console.log('datajson', datajson)

  const legendMargin = 50

  $: titleHeight = 0.2*h
  $: mapHeight = 0.8*h

  $: projection = geoMercator()
    .fitExtent([[60,10],[w-20-legendMargin, mapHeight - 40]], provincies)
  
  $: path = geoPath(projection);

  colorScale.set(
    scaleLinear()
    .domain([0,10,20,30,40,50,60])
    .range(['#F5F908', '#F5AC05', '#F55E05', '#FA2804', '#F00004', '#780103', '#000000'])
  )

  afterUpdate(() => select('.id-' + $gridSelection).raise())

  function click(feature){
    select('.whiterect').interrupt('ease').attr('x', 0)
    gridSelection.set(feature.properties.gridcode)
  }

  function mouseOver(feature){
    gridHover.set(feature.properties.gridcode)
    select('.id-' + $gridHover).raise()
  }

  function mouseOut(){
    gridHover.set(null)
  }

</script>

<div class='title' style='height:{titleHeight}px'>
  <div class='title-white-bg'>
    <h2>{($indicatorSelection === 'tropischedagen') ? 'Tropische dagen' : 'Reeks droge dagen'} <strong style='font-size:16px'>bij scenario </strong>{$periodSelection}</h2>
    <p style='font-style:italic'>Pas locatie aan op de kaart</p>
  </div>
</div>
<div class='map-svg' style='height:{mapHeight}px'>
  <svg>
    {#if $colorScale}
      <Legend w={w*0.2} h={mapHeight}/>
    {/if}
    <g transform='translate({legendMargin},0)'>
      <g class='provincies'>
        {#each provincies.features as feature}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <path
            d={path(feature)}
            class='shape'
            fill='#fcfbf2'
            stroke='grey'
          />
        {/each}
      </g>
      <g class='rasterdata'>
        {#each cellen.features as feature, i}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <path
            d={'M' + path(feature).split('M')[1]}
            class={'rasterblokje ' + 'id-' + feature.properties.gridcode}
            fill={$colorScale(+$indicatorData[$indicatorSelection].filter(d => +d.index === feature.properties.gridcode)[0][$periodSelection])}
            stroke={(feature.properties.gridcode == $gridSelection)
              ? 'cyan' 
              : (feature.properties.gridcode == $gridHover)
                ? 'grey'
                : 'white'}
            stroke-width={(feature.properties.gridcode == $gridSelection) ? '3' : '1'}
            on:click={() => click(feature)}
            on:mouseover={() => mouseOver(feature)}
            on:mouseout={() => mouseOut()}
          />      
        {/each}
      </g>
      {#each NLsteden as NLstad, i}
        <g class='NLstad' transform='translate({projection([NLstad.lon, NLstad.lat])[0]},{projection([NLstad.lon, NLstad.lat])[1]})'>
          <circle
            fill={'black'}
            stroke='white'
            r='3'
          />
          <text class='stad-text' font-size='9' x={(NLstad.Stad === 'Haarlem') ? '-30' : '0'} y='1.32em' text-anchor='middle'>
            {NLstad.Stad}
          </text>
        </g>
      {/each}
    </g>
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

  .rasterblokje{
    /* transition: all 2s; */
  }

  .stad-text{
    stroke-linecap: butt;
    stroke-linejoin: miter;
    stroke:white;
    stroke-width:1.5;
    paint-order:stroke;
    fill:black;
  }

</style>