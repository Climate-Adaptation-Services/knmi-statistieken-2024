<script>
// @ts-nocheck
  import { geoMercator, geoPath, scaleLinear, select } from 'd3';
  import { colorScale, gridSelection, periodSelection, indicatorSelection, indicatorMetaData, period_options, circleFeatures, neerslagIndicatoren, regimeSelection, lang, brabantKEA } from '$lib/stores';
  import { afterUpdate } from 'svelte';
  import Legend from './Legend.svelte';
  import MapShapes from './MapShapes.svelte';
  import rewind from '@turf/rewind'
  import flip from '@turf/flip'
  import { t } from '$lib/i18n/translate';

  export let datajson
  export let w
  export let h
  export let NLsteden

  const provincies = datajson[0]
  const cellen = datajson[1];
  const cellen_brabant = datajson[2];
  const grenzen = datajson[3];
  const neerslagregimes_winter = datajson[4];
  const neerslagregimes_jaar = datajson[5];

  console.log('datajson', datajson)
  console.log('cellen features count:', cellen.features?.length)
  console.log('cellen_brabant features count:', cellen_brabant.features?.length)
  console.log('first 3 cellen coords:', cellen.features?.slice(0,3).map(f => f.geometry.coordinates))

  $: {
    if($brabantKEA){
      circleFeatures.set(cellen_brabant.features)
      console.log('Set Brabant features:', cellen_brabant.features.length)
    } else {
      circleFeatures.set(cellen.features)
      console.log('Set full NL features:', cellen.features.length)
    }
  }

  const legendMargin = 50

  $: titleHeight = 0.2*h
  $: mapHeight = 0.8*h

  $: boundingbox = ($brabantKEA) ? provincies.features[10] : cellen
  $: xOffset = ($brabantKEA) ? w*0.25 : 60

  $: {
    console.log('Creating projection with:', {
      boundingbox: boundingbox?.type || boundingbox?.geometry?.type,
      extent: [[xOffset,10],[w-legendMargin-10, mapHeight-40]],
      isBrabant: $brabantKEA
    });
  }

  $: projection = geoMercator()
    .fitExtent([[xOffset,10],[w-legendMargin-10, mapHeight-40]], boundingbox)

  $: path = geoPath(projection);

  $: {
    const testCoords = $circleFeatures?.[0]?.geometry?.coordinates;
    const testProjected = testCoords ? projection(testCoords) : null;
    console.log('Map debug:', {
      brabantKEA: $brabantKEA,
      w, h, mapHeight,
      circleFeatures: $circleFeatures?.length,
      firstCoords: testCoords,
      projected: testProjected,
      sample5: $circleFeatures?.slice(0, 5).map(f => ({
        coords: f.geometry.coordinates,
        proj: projection(f.geometry.coordinates)
      }))
    });
  }

  // console.log('indicatorMetaData', $indicatorMetaData, $indicatorSelection, t($indicatorSelection), $lang)
  const firstIndicator = $indicatorMetaData.filter((ind) => ind['Indicator'] === $indicatorSelection)[0]

  colorScale.set(
    scaleLinear()
    .domain(firstIndicator['y-as domein'].split(','))
    .range(firstIndicator['Kleuren'].split(','))
  )

  afterUpdate(() => select('.id-' + $gridSelection).raise())

  $: neerslagRegimesFeatures = ($neerslagIndicatoren.includes($indicatorSelection))
    ? ($indicatorSelection.slice(0,18) === t('10-daagse neerslag - eens per jaar').slice(0,18)) 
      ? neerslagregimes_winter.features
      : neerslagregimes_jaar.features
    : null

  $: if($indicatorSelection.slice(0,3) === 'Uur'){
    regimeSelection.set('R')
  }
  
</script>

<div class='title' style='height:{titleHeight}px'>
  <div class='title-white-bg'>
    <h3 class='indicator-title' style='margin-bottom:10px'>{$indicatorSelection}</h3>
    {#if $indicatorSelection !== t('Zeespiegelstijging')}
      <h3 style='margin-top:0px; margin-bottom:10px'><strong style='color:grey'>Scenario: </strong>{$period_options.filter(po => po.value === $periodSelection)[0].label}</h3>
    {/if}
    {#if $neerslagIndicatoren.includes($indicatorSelection) && $indicatorSelection.slice(0,3) !== 'Uur'}
      <h3 style='margin-top:0px'><strong style='color:grey'>{t('Neerslagregime')}: </strong>{$regimeSelection}</h3>
    {/if}
  </div>
</div>
<div class='map-svg' style='height:{mapHeight}px'>
  <svg width={w} height={mapHeight}>
    {#if $neerslagIndicatoren.includes($indicatorSelection)}
      <!-- if neerslagstatistieken show 4 delen -->
      <g transform='translate({legendMargin},0)'>
        {#if $indicatorSelection.slice(0,3) === 'Uur'}
          <path
            d={path(grenzen.features[0])}
            class='shape'
            fill='#84C76E'
            stroke='grey'
          />
        {:else}
          {#each neerslagRegimesFeatures as regime, i}
            <path
              d={path(rewind(regime,{reverse:true}))}
              class='shape'
              fill='{(regime.properties.Regio === 'R') 
                ? '#84C76E' 
                : (regime.properties.Regio === 'L') 
                  ? '#F4815A' 
                  : (regime.properties.Regio === 'H') 
                  ? '#24BEC6' 
                  : 'purple'}'
              stroke='grey'
              opacity={(regime.properties.Regio === $regimeSelection) ? 1 : 0.2}
              on:click={() => regimeSelection.set(regime.properties.Regio)}
              cursor='pointer'
            />
          {/each}
        {/if}
      </g>
    {:else}
      {#if $colorScale}
        <Legend w={w*0.2} h={mapHeight}/>
      {/if}

      <g transform='translate({legendMargin},0)'>
        <g class='provincies'>
          {#each provincies.features as feature}
            {#if $brabantKEA === false || feature.properties.statnaam === 'Noord-Brabant'}
              <path
                d={path(feature)}
                class='shape'
                fill='none'
                stroke='grey'
              />
            {/if}
          {/each}
        </g>

        <MapShapes {projection} {w} />

        {#each NLsteden as NLstad, i}
          {#if $brabantKEA === false || ['Den Bosch', 'Tilburg', 'Eindhoven'].includes(NLstad.Stad)}
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
          {/if}
        {/each}
      </g>
    {/if}
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