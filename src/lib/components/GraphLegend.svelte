<script>
  export let yScale;
  export let xScale;
  export let h
  export let areaHover
  export let areaMouseOut

</script>

<g transform='translate({0},{h + 60})' font-size='13'>
  <text class='legend-text-hoog otherscenario-hoog' fill='red' cursor='default' on:mouseover={() => areaHover('hoog')} on:mouseout={() => areaMouseOut('hoog')}>Hoog scenario</text>
  <text class='legend-text-laag otherscenario-laag' x='150px' cursor='default' on:mouseover={() => areaHover('laag')} on:mouseout={() => areaMouseOut('laag')}>Laag scenario</text>
</g>


<style>
  .legend-text-hoog{
    fill:red
  }
  .legend-text-laag{
    fill:#17A3D3
  }

</style>