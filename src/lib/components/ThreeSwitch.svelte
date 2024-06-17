<script>
  import { scenarioSelection } from "$lib/stores";
  import { selectAll } from "d3";

  export let w

  const rectWidth = 100
  const rectHeight = 5
  const rectOffset = rectWidth/2

  function changeScenario(scenario, otherscenario){
    scenarioSelection.set(scenario)

    selectAll('.scenario-laag, .scenario-hoog').style('opacity', 1)
    selectAll('.scenario-' + scenario).raise()
    selectAll('.scenario-' + otherscenario).style('opacity', 0.2)
  }
</script>

<svg>
  <defs>
    <linearGradient id="laag-gradient">
      <stop offset="0%" stop-color="#17A3D3" />
      <stop offset="35%" stop-color="lightgrey" />
    </linearGradient>
    <linearGradient id="hoog-gradient">
      <stop offset="65%" stop-color="lightgrey" />
      <stop offset="100%" stop-color="red" />
    </linearGradient>
    <linearGradient id="beide-gradient">
      <stop offset="30%" stop-color="lightgrey" />
      <stop offset="50%" stop-color="grey" />
      <stop offset="70%" stop-color="lightgrey" />
    </linearGradient>
  </defs>
  <g class='three-switch' style='fill:#35575A' transform='translate({w/2 - 100},50)'>
    <text x={33} y={-20} style='font-size:16px'>Highlight scenario</text>
    <text text-anchor='end' y='0.96em' x={rectOffset-15}>Laagste</text>
    <rect fill='url(#{$scenarioSelection}-gradient)' width={rectWidth} x={rectOffset} y='5' height={rectHeight} rx='3'></rect>
    <circle class='' r={8} on:click={() => changeScenario('laag', 'hoog')} fill={($scenarioSelection === 'laag') ? '#17A3D3' : 'white'} cx={rectOffset} cy={rectHeight/2 + 5}/>
    
    <!-- <circle class='' r={8} on:click={() => changeScenario('beide', 'beide')} fill={($scenarioSelection === 'beide') ? 'grey' : 'white'} cx={rectOffset+rectWidth/2} cy={rectHeight/2 + 5}/> -->
    <g transform='translate({rectOffset+rectWidth/2 - 10},{7}) scale(0.9)' on:click={() => changeScenario('beide', 'beide')} >
      <path fill={($scenarioSelection === 'beide') ? 'red' : 'white'} d='M0,0, a10,10 0 1,1 20,0'/>
      <path fill={($scenarioSelection === 'beide') ? '#17A3D3' : 'white'} d='M0,0 a10,10 0 1,0 20,0'/>
    </g>

    <circle class='' r={8} on:click={() => changeScenario('hoog', 'laag')} fill={($scenarioSelection === 'hoog') ? 'red' : 'white'} cx={rectOffset+rectWidth} cy={rectHeight/2 + 5}/>
    <circle class='switchSelection' />
    <text text-anchor='middle' x={rectOffset+rectWidth/2} y='2.3em'>Beide</text>
    <text x={rectWidth * 1.5 + 15} y='0.96em'>Hoogste</text>
  </g>
</svg>

<style>
  .three-switch text{
    fill:#35575A;
    font-size: 14px;
  }

  svg{
    width:100%;
  }

  circle, rect{
    transition: all 1s;
  }

  circle, path{
    /* -webkit-filter: drop-shadow( 0px 3px 2px rgba(0, 0, 0, .3)); */
    filter: drop-shadow( 0px 0px 10px rgba(0, 0, 0, 1));
    cursor:pointer;
  }

</style>