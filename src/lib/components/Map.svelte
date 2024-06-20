<script>
// @ts-nocheck
  import { geoMercator, geoPath, scaleLinear, select } from 'd3';
  import { colorScale, gridSelection, periodSelection, indicatorSelection, indicatorMetaData, period_options, circleFeatures } from '$lib/stores';
  import { afterUpdate } from 'svelte';
  import Legend from './Legend.svelte';
  import MapShapes from './MapShapes.svelte';

  export let datajson
  export let w
  export let h
  export let NLsteden

  const provincies = datajson[0]
  const cellen = datajson[1];

  console.log('datajson', datajson)

  circleFeatures.set(cellen.features)

  const legendMargin = 50

  $: titleHeight = 0.2*h
  $: mapHeight = 0.8*h

  $: projection = geoMercator()
    .fitExtent([[60,10],[w-20-legendMargin, mapHeight - 40]], provincies)
  
  $: path = geoPath(projection);

  const firstIndicator = $indicatorMetaData.filter((ind) => ind['Indicator'] === 'Tropische dagen')[0]

  colorScale.set(
    scaleLinear()
    .domain(firstIndicator['y-as domein'].split(','))
    .range(firstIndicator['Kleuren'].split(','))
  )

  afterUpdate(() => select('.id-' + $gridSelection).raise())

</script>

<div class='title' style='height:{titleHeight}px'>
  <div class='title-white-bg'>
    <h3>
      {$indicatorSelection} 
      <strong style='font-size:14px; color:black'>bij </strong>
      {$period_options.filter(po => po.value === $periodSelection)[0].label}
    </h3>
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
          <path
            d={path(feature)}
            class='shape'
            fill='none'
            stroke='grey'
          />
        {/each}
      </g>

      <MapShapes {projection} {w} />

      {#each NLsteden as NLstad, i}
        <g class='NLstad' transform='translate({projection([NLstad.lon, NLstad.lat])[0]},{projection([NLstad.lon, NLstad.lat])[1]})'>
          <circle
            fill={'#35575A'}
            stroke='white'
            r='3'
          />
          <text class='stad-text' style='fill:#35575A' font-size={w/60} y='1.32em' text-anchor='middle'>
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

  .stad-text{
    stroke-linecap: butt;
    stroke-linejoin: miter;
    stroke:white;
    stroke-width:1.5;
    paint-order:stroke;
    fill:black;
  }

</style>