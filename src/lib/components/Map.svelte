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

  if($brabantKEA){circleFeatures.set(cellen_brabant.features)}
  else{circleFeatures.set(cellen.features)}
  
  const legendMargin = 50

  $: titleHeight = 0.2*h
  $: mapHeight = 0.8*h

  const boundingbox = ($brabantKEA) ? provincies.features[10] : provincies
  $: xOffset = ($brabantKEA) ? w*0.25 : 60

  $: projection = geoMercator()
    .fitExtent([[xOffset,10],[w-legendMargin-10, mapHeight-40]], boundingbox)
  
  $: path = geoPath(projection);

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
  
</script>

<div class='title' style='height:{titleHeight}px'>
  <div class='title-white-bg'>
    <h3 class='indicator-title' style='margin-bottom:10px'>{$indicatorSelection}</h3>
    {#if $indicatorSelection !== t('Zeespiegelstijging')}
      <h3 style='margin-top:0px; margin-bottom:10px'><strong style='color:grey'>Scenario: </strong>{$period_options.filter(po => po.value === $periodSelection)[0].label}</h3>
    {/if}
    {#if $neerslagIndicatoren.includes($indicatorSelection)}
      <h3 style='margin-top:0px'><strong style='color:grey'>{t('Neerslagregime')}: </strong>{$regimeSelection}</h3>
    {/if}
  </div>
</div>
<div class='map-svg' style='height:{mapHeight}px'>
  <svg>
    {#if $indicatorSelection === t('Zeespiegelstijging')}
      <!-- if zeespiegelstijging show country borders -->
      <g class='borders' transform='translate({legendMargin},0)'>
        <path
          d={path(grenzen.features[0])}
          class='shape'
          fill='none'
          stroke='grey'
        />
      </g>
    {:else if $neerslagIndicatoren.includes($indicatorSelection)}
      <!-- if neerslagstatistieken show 4 delen -->
      <g transform='translate({legendMargin},0)'>
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