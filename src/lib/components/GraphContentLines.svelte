<script>


  export let xScale;
  export let yScale;
  export let datalist_laag;
  export let datalist_hoog;

  $: strokeDif2050 = yScale(datalist_laag[1].p95) - yScale(datalist_hoog[1].p95)
  $: strokeDif2100 = yScale(datalist_laag[2].p95) - yScale(datalist_hoog[2].p95)


</script>

<g class='graph-content-lines'>
  <line stroke={'black'} y2={yScale(datalist_laag[0].p5)} y1={yScale(datalist_hoog[0].p95)} x1={xScale(t('Huidig klimaat'))} x2={xScale(t('Huidig klimaat'))} stroke-dasharray="8 8" stroke-width='2.8'/>
  {#each [['laag', datalist_laag], ['hoog', datalist_hoog]] as datalist}
    <g class='dashed-lines'>
      <line class='scenario-{datalist[0]}' stroke={(datalist[0] === 'laag') ? '#17A3D3' : 'red'} y2={yScale(datalist[1][1].p5)} y1={yScale(datalist[1][1].p95)} x1={xScale(datalist[1][1].period)} x2={xScale(datalist[1][1].period)} stroke-dasharray="8 8" stroke-width='2.8' stroke-dashoffset={(datalist[0] === 'laag') ? strokeDif2050+8 : "0"} />
      <line class='scenario-{datalist[0]}' stroke={(datalist[0] === 'laag') ? '#17A3D3' : 'red'} y2={yScale(datalist[1][2].p5)} y1={yScale(datalist[1][2].p95)} x1={xScale(datalist[1][2].period)} x2={xScale(datalist[1][2].period)} stroke-dasharray="8 8" stroke-width='2.8' stroke-dashoffset={(datalist[0] === 'laag') ? strokeDif2100+8 : "0"} />
    </g>
    <g class='median-line scenario-{datalist[0]}' stroke='{(datalist[0] === 'laag') ? '#17A3D3' : 'red'}'>
      <line x1={xScale(t('Huidig klimaat'))} x2={xScale('2050')} y1={yScale(datalist[1][0].median)} y2={yScale(datalist[1][1].median)}/>
      <line x1={xScale('2050')} x2={xScale('2100')} y1={yScale(datalist[1][1].median)} y2={yScale(datalist[1][2].median)}/>
    </g>
  {/each}
</g>

<style>

</style>