<script>
  export let yScale;
  export let xScale;
  export let h
  export let areaHover
  export let areaMouseOut

</script>

<g transform='translate({0},{h + 60})' font-size='16'>
  <text class='legend-text-hoog otherscenario-hoog' fill='red' cursor='default' on:mouseover={() => areaHover('hoog')} on:mouseout={() => areaMouseOut('hoog')}>Hoog scenario</text>
  <text y='2em' class='legend-text-laag otherscenario-laag' cursor='default' on:mouseover={() => areaHover('laag')} on:mouseout={() => areaMouseOut('laag')}>Laag scenario</text>
  <text class='legend-text-ref' y='4em' cursor='default'>Referentie</text>
</g>


<style>
  .legend-text-hoog{
    fill:red
  }
  .legend-text-laag{
    fill:#17A3D3
  }

  .legend-text-ref{
    fill:black;
  }

</style>