<script>
  import { scenarioSelection } from "$lib/stores";
    import { selectAll } from "d3";

  const rectWidth = 100
  const rectHeight = 7
  const rectOffset = rectWidth/2

  function changeScenario(scenario, otherscenario){
    scenarioSelection.set(scenario)

    selectAll('.scenario-laag, .scenario-hoog').style('opacity', 1)
    selectAll('.scenario-' + scenario).raise()
    selectAll('.scenario-' + otherscenario).style('opacity', 0.2)
  }
</script>

<svg>
  <g class='three-switch' style='fill:white' transform='translate(33,0)'>
    <text text-anchor='end' y='0.96em' x={rectOffset-15}>Laagste</text>
    <rect width={rectWidth} x={rectOffset} y='5' height={rectHeight} rx='3'></rect>
    <circle class='' r={8} on:click={() => changeScenario('laag', 'hoog')} fill={($scenarioSelection === 'laag') ? '#17A3D3' : 'white'} cx={rectOffset} cy={rectHeight/2 + 5}/>
    <circle class='' r={8} on:click={() => changeScenario('beide', 'beide')} fill={($scenarioSelection === 'beide') ? 'grey' : 'white'} cx={rectOffset+rectWidth/2} cy={rectHeight/2 + 5}/>
    <circle class='' r={8} on:click={() => changeScenario('hoog', 'laag')} fill={($scenarioSelection === 'hoog') ? 'red' : 'white'} cx={rectOffset+rectWidth} cy={rectHeight/2 + 5}/>
    <circle class='switchSelection' />
    <text text-anchor='middle' x={rectOffset+rectWidth/2} y='2.3em'>Beide</text>
    <text x={rectWidth * 1.5 + 15} y='0.96em'>Hoogste</text>
  </g>
</svg>

<style>
  .three-switch text{
    fill:white;
    font-size: 14px;
  }

  svg{
    width:100%;
  }

  circle{
    transition: all 1s;
  }

</style>