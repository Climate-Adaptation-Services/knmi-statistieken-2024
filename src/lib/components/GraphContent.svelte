
<script>
  import * as d3 from 'd3';
  import { afterUpdate } from 'svelte';
  import rough from 'roughjs';
  import { gridSelection, indicatorData, indicatorSelection, periodName, periodSelection, gridHover, scenarioSelection, graphHover } from '$lib/stores';
  import GraphLegend from './GraphLegend.svelte';
  import ThreeSwitch from './ThreeSwitch.svelte';

  export let xScale;
  export let yScale;
  export let w;
  export let h;
  export let innerHeight;
  export let margin

  $: dataSelected = $indicatorData[$indicatorSelection].filter(d => +d.index === $gridSelection)[0]

  $: datalist_laag = [
    {'period':'Huidig klimaat', 'median':dataSelected.ref, 'p5':dataSelected.ref_p5, 'p95':dataSelected.ref_p95},
    {'period':'Klimaat 2050', 'median':dataSelected['2050laag'], 'p5':dataSelected['2050laag_p5'], 'p95':dataSelected['2050laag_p95']},
    {'period':'Klimaat 2100', 'median':dataSelected['2100laag'], 'p5':dataSelected['2100laag_p5'], 'p95':dataSelected['2100laag_p95']}
  ]
  $: datalist_hoog = [
    {'period':'Huidig klimaat', 'median':dataSelected.ref, 'p5':dataSelected.ref_p5, 'p95':dataSelected.ref_p95},
    {'period':'Klimaat 2050', 'median':dataSelected['2050hoog'], 'p5':dataSelected['2050hoog_p5'], 'p95':dataSelected['2050hoog_p95']},
    {'period':'Klimaat 2100', 'median':dataSelected['2100hoog'], 'p5':dataSelected['2100hoog_p5'], 'p95':dataSelected['2100hoog_p95']}
  ]

  $: strokeDif2050 = yScale(datalist_laag[1].p95) - yScale(datalist_hoog[1].p95)
  $: strokeDif2100 = yScale(datalist_laag[2].p95) - yScale(datalist_hoog[2].p95)

  const areaPath = d3.area()
    .x(d => xScale(d.period))
    .y0(d => yScale(d.p5))
    .y1(d => yScale(d.p95))

  function createRoughArea(datalist, angle, color, svgElement){
    const rc = rough.svg(svgElement);

    const path = rc.path(areaPath(datalist),
      { 
        roughness: 0, 
        fill: color, 
        stroke: 'none',
        fillStyle:'solid',
        fillWeight: 3,
        hachureGap: 6,
        hachureAngle: angle,
        strokeWidth: 2,
      });
    svgElement.appendChild(path);
  }

  let svgElementLaag;
  let svgElementHoog;
  afterUpdate(() => {
    d3.selectAll('.rough g g').remove()

    createRoughArea(datalist_hoog, 45, 'red', svgElementHoog)
    createRoughArea(datalist_laag, -45, '#17A3D3', svgElementLaag)

    d3.select('.whiterect')
      // .raise()
      .transition('ease').duration(2000).ease(d3.easeQuadOut)
      .attr('x', w*1.8)
    
    d3.selectAll('.rough g g').style('opacity', '0.2')
  })

  function mouseOverGraph(period){graphHover.set(period)}
  function mouseOutGraph(){graphHover.set(null)}

</script>

<g class='graph-content'>
  <g class='rough' height={h} width={w}>
    <g class='scenario-laag' bind:this={svgElementLaag}></g>
    <g class='scenario-hoog' bind:this={svgElementHoog}></g>
    <defs>
      <linearGradient id="roughGradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color={'grey'} />
        <stop offset="100%" stop-color={'grey'} />
      </linearGradient>
    </defs>
  </g>
  <g class='circles' pointer-events='none'>
    <!-- Eerst alle dashed lines, dan alle circles -->
    <line stroke={'black'} y2={yScale(datalist_laag[0].p5)} y1={yScale(datalist_hoog[0].p95)} x1={xScale('Huidig klimaat')} x2={xScale('Huidig klimaat')} stroke-dasharray="8 8" stroke-width='2.8'/>
    {#each [['laag', datalist_laag], ['hoog', datalist_hoog]] as datalist}
      <g class='dashed-lines'>
        <line class='scenario-{datalist[0]}' stroke={(datalist[0] === 'laag') ? '#17A3D3' : 'red'} y2={yScale(datalist[1][1].p5)} y1={yScale(datalist[1][1].p95)} x1={xScale(datalist[1][1].period)} x2={xScale(datalist[1][1].period)} stroke-dasharray="8 8" stroke-width='2.8' stroke-dashoffset={(datalist[0] === 'laag') ? strokeDif2050+8 : "0"} />
        <line class='scenario-{datalist[0]}' stroke={(datalist[0] === 'laag') ? '#17A3D3' : 'red'} y2={yScale(datalist[1][2].p5)} y1={yScale(datalist[1][2].p95)} x1={xScale(datalist[1][2].period)} x2={xScale(datalist[1][2].period)} stroke-dasharray="8 8" stroke-width='2.8' stroke-dashoffset={(datalist[0] === 'laag') ? strokeDif2100+8 : "0"} />
      </g>
      <g class='median-line scenario-{datalist[0]}' stroke='{(datalist[0] === 'laag') ? '#17A3D3' : 'red'}'>
        <line x1={xScale('Huidig klimaat')} x2={xScale('Klimaat 2050')} y1={yScale(datalist[1][0].median)} y2={yScale(datalist[1][1].median)}/>
        <line x1={xScale('Klimaat 2050')} x2={xScale('Klimaat 2100')} y1={yScale(datalist[1][1].median)} y2={yScale(datalist[1][2].median)}/>
        <!-- <g font-size='11px' font-weight='normal' transform='translate({xScale('Klimaat 2100') + 15},{0})'>
            <g transform='translate({0},{yScale(datalist[1][2].median) - 8})'>
              <text>Langjarig</text>  
              <text y='1em'>gemiddelde</text>  
              <text y='2em'>over 30 jaar</text>  
            </g>
            <text font-size='14' y={yScale(datalist[1][2].p95)}>95%</text>  
            <text font-size='14' y={yScale(datalist[1][2].p5)}>5%</text>  
        </g> -->
      </g>
    {/each}
    <g>
      {#each [['laag', datalist_laag], ['hoog', datalist_hoog]] as datalist}
        {#each [['Huidig klimaat', datalist[1][0].median], ['Klimaat 2050', datalist[1][1].median], ['Klimaat 2100', datalist[1][2].median], ['Huidig klimaat', datalist[1][0].p5], ['Huidig klimaat', datalist[1][0].p95], ['Klimaat 2050', datalist[1][1].p5], ['Klimaat 2100', datalist[1][2].p5], ['Klimaat 2050', datalist[1][1].p95], ['Klimaat 2100', datalist[1][2].p95]] as circleData, i}
          <g class='scenario-{datalist[0]}' transform='translate({xScale(circleData[0])},{yScale(circleData[1])})'>
            {#if i < 3}
            <circle fill={(i < 1) 
                ? 'black' 
                : (datalist[0] === 'laag')
                  ? '#17A3D3' 
                  : 'red'} 
              r='4' stroke='none'/>
            {/if}
            {#if ($scenarioSelection === datalist[0] || $graphHover === circleData[0]) && (!([0,3,4].includes(i) && datalist[0] === 'laag') || $scenarioSelection === 'laag') }
              <text style='fill:{([0,3,4].includes(i)) ? 'black' : (datalist[0] === 'laag') ? '#17A3D3' : 'red'}'
              text-anchor={(datalist[0] === 'hoog') ? '' : 'end'} dx={(datalist[0] === 'hoog') ? '0.5em' : '-0.5em'} dy={'-0.4em'}>{Math.round(circleData[1])}</text>
            {/if}
          </g>
        {/each}
      {/each}
    </g>
  </g>
  <g class='current-map-selection'>
    <g transform='translate({xScale($periodName)},{yScale(dataSelected[$periodSelection])})'>
      <circle r='5' fill='none' stroke='cyan' stroke-width='3'/>
      <!-- <text text-anchor='middle' class='hidden-on-hover' style='fill:black' font-size='9' dy='1.8em'>Mediaan selectie</text> -->
    </g>
    {#if $gridHover}
      <circle cx={xScale($periodName)} cy={yScale($indicatorData[$indicatorSelection].filter(d => +d.index === $gridHover)[0][$periodSelection])} r='5' fill='none' stroke='grey' stroke-width='3'/>
    {/if}
  </g>
</g>
<g class='hover-rects'>
  {#each xScale.domain() as period}
    <rect fill='black' x={xScale(period)-25} y={0} height={h} width='50' fill-opacity='0' on:mouseover={() => mouseOverGraph(period)}  on:mouseout={() => mouseOutGraph()}/>
  {/each}
</g>
<rect class='whiterect' x={0} y={margin.top} width={w} height={innerHeight-margin.top} fill='#fcfbf2'/>
<g>
  <GraphLegend {xScale} {yScale} {w} h={innerHeight} {margin} />
</g>

<style>
  .visible-on-hover{
    visibility: hidden;
  }

  .graph-content:hover .visible-on-hover{
    visibility: visible;
  }

  .graph-content:hover .hidden-on-hover{
    visibility: hidden;
  }
  
</style>
