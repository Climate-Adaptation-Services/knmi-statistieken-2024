<script>
  import { scenarioSelection, graphHover, temperatuurIndicatoren, neerslagIndicatoren, indicatorSelection } from "$lib/stores";
  import { t } from '$lib/i18n/translate';

  export let xScale
  export let yScale
  export let datalist_laag
  export let datalist_hoog

  $: textLocations = ($neerslagIndicatoren.includes($indicatorSelection))
    ? ['median']
    : ['p5', 'median', 'p95']

  function rounding(value){
    return ($neerslagIndicatoren.includes($indicatorSelection) || $temperatuurIndicatoren.includes($indicatorSelection) )
      ? Math.round(value*10)/10
      : Math.round(value)
  }

  function getYPos(datalist, index, perc){
    if(perc === 'p5'){
      console.log(yScale(datalist[index]['median']))
      if(yScale(datalist[index]['p5']) - yScale(datalist[index]['median']) < 10){
        return yScale(datalist[index][perc]) + 7
      }
    }else if(perc === 'p95'){
      if(yScale(datalist[index]['p95']) - yScale(datalist[index]['median']) < 10){
        return yScale(datalist[index][perc]) - 7
      }
    }
    return yScale(datalist[index][perc])
    
  }

</script>

<g class='graph-content-texts'>
  <g class='texts-laag scenario-laag'>
    {#each ['2050', '2100'] as periodName, i}
      {#each textLocations as perc}
        {#if ($scenarioSelection === 'laag' || $graphHover === periodName) }
          <text x={xScale(datalist_laag[i+1].period)} y={getYPos(datalist_laag, i+1, perc)} style='fill:#17A3D3; font-size:13px;' text-anchor='end' dx='-0.5em'>{rounding(datalist_laag[i+1][perc])}</text>     
        {/if}
      {/each}
    {/each}
  </g>
  <g class='texts-hoog scenario-hoog'>
    {#each ['2050', '2100'] as periodName, i}
      {#each textLocations as perc}
        {#if ($scenarioSelection === 'hoog' || $graphHover === periodName) }
          <text x={xScale(datalist_hoog[i+1].period)} y={getYPos(datalist_hoog, i+1, perc)} style='fill:red; font-size:13px;' dx='0.5em'>{rounding(datalist_hoog[i+1][perc])}</text>     
        {/if}
      {/each}
    {/each}
  </g>
  <g class='texts-huidig'>
    {#each textLocations as perc}
      {#if ($scenarioSelection !== 'beide' || $graphHover === t('Huidig klimaat')) }
        <text x={xScale(datalist_hoog[0].period)} y={getYPos(datalist_hoog, 0, perc)} style='fill:black; font-size:13px;' dx='0.5em'>{rounding(datalist_hoog[0][perc])}</text>     
      {/if}
    {/each}
  </g>
</g>

<style>

</style>