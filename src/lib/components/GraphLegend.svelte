<script>
  import { scenarioSelection } from "$lib/stores";
  import { selectAll } from "d3";
  
  export let yScale;
  export let xScale;
  export let h
  export let w;
  export let areaHover
  export let areaMouseOut
  export let margin

  function mouseOverScenario(scenario, otherscenario){
    scenarioSelection.set(scenario)
    selectAll('.scenario-laag, .scenario-hoog').style('opacity', 1)
    // selectAll('.scenario-' + scenario).raise()
    selectAll('.scenario-' + otherscenario).style('opacity', 0.2)
  }

  function mouseOutScenario(){
    scenarioSelection.set('beide')
    selectAll('.scenario-laag, .scenario-hoog').style('opacity', 1)
  }

  function infoHover(){

  }


</script>

<g transform='translate({0},{h+80})' font-size='16'>
  <rect width={300} height='150' x='0' y='-20' fill='white' stroke='lightgrey' rx='15'/>
  <g transform='translate({58},0)'>
    <g transform='translate(0,10)' on:mouseover={() => mouseOverScenario('hoog', 'laag')} on:mouseout={() => mouseOutScenario()}>
      <text class='legend-text-hoog' fill='red' cursor='default' >Hoogste scenario</text>
      <rect width='30' height='20' fill='red' x='150' y='-15' opacity='0.2'/>
      <line x1='150' y1='-5' x2='180' y2='-5' stroke='red'/>
    </g>
    <image href='/images/info.png' width='16' y='-3' x='190' opacity='0.6' on:mouseover={() => infoHover()}/>
    <g transform='translate(0,40)' on:mouseover={() => mouseOverScenario('laag', 'hoog')} on:mouseout={() => mouseOutScenario()}>
      <text class='legend-text-laag' fill='#17A3D3' cursor='default'>Laagste scenario</text>
      <rect width='30' height='20' fill='#17A3D3' x='150' y='-15' opacity='0.2'/>
      <line x1='150' y1='-5' x2='180' y2='-5' stroke='#17A3D3'/>
    </g>
    <image href='/images/info.png' width='16' y='27' x='190' opacity='0.6' on:mouseover={() => infoHover()}/>
    <g class='langjarig' style='fill:grey' transform='translate(-20,66)'>
      <circle r='4'/>
      <line x2={50} stroke='grey'/>
      <circle r='4' cx='50'/>
      <text font-size='12' x='65' y='0.32em'>Langjarig gemiddelde (30 jaar)</text>
    </g>
    <image href='/images/info.png' width='16' y='57' x='214' opacity='0.6' on:mouseover={() => infoHover()}/>
    <g class='jaar-op-jaar' style='fill:grey' transform='translate(-20,100)'>
      <rect width='50' height='30' fill='grey' x='0' y='-15' opacity='0.2'/>
      <line x1='50' y1='-15' x2='50' y2='15' stroke='grey' stroke-dasharray='4 4' stroke-width='2'/>
      <text font-size='12' x='65' y='0.32em'>Jaar op jaar variatie (90% band)</text>
    </g>
    <image href='/images/info.png' width='16' y='91.5' x='219' opacity='0.6' on:mouseover={() => infoHover()}/>
  </g>
  <!-- <h3>Toon scenario grafiek</h3>
  <div class='switch-div'> -->
    <!-- <ThreeSwitch {w}/> -->
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