<script>
  import { scenarioSelection, graphHover, temperatuurIndicatoren, neerslagIndicatoren, indicatorSelection } from "$lib/stores";
  
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

</script>

<g class='graph-content-circles'>
  <g class='circles-laag scenario-laag'>
    <circle cx={xScale(datalist_laag[1].period)} cy={yScale(datalist_laag[1].median)} fill='#17A3D3' r='4' stroke='none'/>
    <circle cx={xScale(datalist_laag[2].period)} cy={yScale(datalist_laag[2].median)} fill='#17A3D3' r='4' stroke='none'/>
  </g>
  <g class='circles-hoog scenario-hoog'>
    <circle cx={xScale(datalist_hoog[1].period)} cy={yScale(datalist_hoog[1].median)} fill='red' r='4' stroke='none'/>
    <circle cx={xScale(datalist_hoog[2].period)} cy={yScale(datalist_hoog[2].median)} fill='red' r='4' stroke='none'/>
  </g>
  <g class='circles-huidig'>
    <circle cx={xScale(datalist_hoog[0].period)} cy={yScale(datalist_hoog[0].median)} fill='black' r='4' stroke='none'/>
  </g>
</g>

<g class='graph-content-texts'>
  <g class='texts-laag scenario-laag'>
    {#each ['2050', '2100'] as periodName, i}
      {#each textLocations as perc}
        {#if ($scenarioSelection === 'laag' || $graphHover === periodName) }
          <text x={xScale(datalist_laag[i+1].period)} y={yScale(datalist_laag[i+1][perc])} style='fill:#17A3D3; font-size:13px;' text-anchor='end' dx='-0.5em'>{rounding(datalist_laag[i+1][perc])}</text>     
        {/if}
      {/each}
    {/each}
  </g>
  <g class='texts-hoog scenario-hoog'>
    {#each ['2050', '2100'] as periodName, i}
      {#each textLocations as perc}
        {#if ($scenarioSelection === 'hoog' || $graphHover === periodName) }
          <text x={xScale(datalist_hoog[i+1].period)} y={yScale(datalist_hoog[i+1][perc])} style='fill:red; font-size:13px;' dx='0.5em'>{rounding(datalist_hoog[i+1][perc])}</text>     
        {/if}
      {/each}
    {/each}
  </g>
  <g class='texts-huidig'>
    {#each textLocations as perc}
      {#if ($scenarioSelection !== 'beide' || $graphHover === 'Current climate') }
        <text x={xScale(datalist_hoog[0].period)} y={yScale(datalist_hoog[0][perc])} style='fill:black; font-size:13px;' dx='0.5em'>{rounding(datalist_hoog[0][perc])}</text>     
      {/if}
    {/each}
  </g>
</g>

<style>

</style>