<script>

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

<style>

</style>