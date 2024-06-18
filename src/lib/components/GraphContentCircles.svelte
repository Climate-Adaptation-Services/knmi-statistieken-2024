<script>
  import { scenarioSelection, graphHover } from "$lib/stores";
  
  export let xScale
  export let yScale
  export let datalist_laag
  export let datalist_hoog

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
    {#each ['Klimaat 2050', 'Klimaat 2100'] as periodName, i}
      {#each ['p5', 'median', 'p95'] as perc}
        {#if ($scenarioSelection === 'laag' || $graphHover === periodName) }
          <text x={xScale(datalist_laag[i+1].period)} y={yScale(datalist_laag[i+1][perc])} style='fill:#17A3D3' text-anchor='end' dx='-0.5em'>{Math.round(datalist_laag[i+1][perc])}</text>     
        {/if}
      {/each}
    {/each}
  </g>
  <g class='texts-hoog scenario-hoog'>
    {#each ['Klimaat 2050', 'Klimaat 2100'] as periodName, i}
      {#each ['p5', 'median', 'p95'] as perc}
        {#if ($scenarioSelection === 'hoog' || $graphHover === periodName) }
          <text x={xScale(datalist_hoog[i+1].period)} y={yScale(datalist_hoog[i+1][perc])} style='fill:red' dx='0.5em'>{Math.round(datalist_hoog[i+1][perc])}</text>     
        {/if}
      {/each}
    {/each}
  </g>
  <g class='texts-huidig'>
    {#each ['p5', 'median', 'p95'] as perc}
      {#if ($scenarioSelection !== 'beide' || $graphHover === 'Huidig klimaat') }
        <text x={xScale(datalist_hoog[0].period)} y={yScale(datalist_hoog[0][perc])} style='fill:black' dx='0.5em'>{Math.round(datalist_hoog[0][perc])}</text>     
      {/if}
    {/each}
  </g>
</g>

<style>

</style>