<script>
  import ThreeSwitch from "./ThreeSwitch.svelte";
  
  export let yScale;
  export let xScale;
  export let h
  export let w;
  export let areaHover
  export let areaMouseOut
  export let margin


</script>

<g transform='translate({0},{h+margin.top+70})' font-size='16'>
  <rect width={600} height='150' x='0' y='-20' fill='white' stroke='lightgrey'/>
  <g transform='translate({58},0)'>
    <g transform='translate(0,10)'>
      <text class='legend-text-hoog' fill='red' cursor='default' >Hoogste scenario</text>
      <rect width='30' height='20' fill='red' x='150' y='-15' opacity='0.2'/>
      <line x1='150' y1='-5' x2='180' y2='-5' stroke='red'/>
    </g>
    <g transform='translate(0,40)'>
      <text class='legend-text-laag' fill='#17A3D3' cursor='default'>Laagste scenario</text>
      <rect width='30' height='20' fill='#17A3D3' x='150' y='-15' opacity='0.2'/>
      <line x1='150' y1='-5' x2='180' y2='-5' stroke='#17A3D3'/>
    </g>
    <g class='langjarig' style='fill:grey' transform='translate(5,66)'>
      <circle r='4'/>
      <line x2={50} stroke='grey'/>
      <circle r='4' cx='50'/>
      <text font-size='12' x='65' y='0.32em'>Langjarig gemiddelde</text>
    </g>
    <g class='jaar-op-jaar' style='fill:grey' transform='translate(-20,100)'>
      <rect width='50' height='30' fill='grey' x='0' y='-15' opacity='0.2'/>
      <line x1='50' y1='-15' x2='50' y2='15' stroke='grey' stroke-dasharray='4 4' stroke-width='2'/>
      <text font-size='12' x='65' y='0.32em'>Jaar op jaar variatie (90% band)</text>
    </g>
  </g>
  <!-- <h3>Toon scenario grafiek</h3>
  <div class='switch-div'> -->
    <ThreeSwitch {w}/>
  <!-- </div> -->
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

  .switch-div{
    width:100%;
  }

</style>