
<script>
  import { select, selectAll, area, easeQuadOut } from 'd3';
  import { afterUpdate } from 'svelte';
  import rough from 'roughjs';
  import { gridSelection, indicatorData, indicatorSelection, periodName, periodSelection, gridHover, graphHover, scenarioSelection, neerslagIndicatoren, regimeSelection } from '$lib/stores';
  import GraphLegend from './GraphLegend.svelte';
  // import ThreeSwitch from './ThreeSwitch.svelte';
  import GradientDefs from './GradientDefs.svelte';
  import GraphContentLines from './GraphContentLines.svelte';
  import GraphContentCircles from './GraphContentCircles.svelte';

  export let xScale;
  export let yScale;
  export let w;
  export let h;
  export let innerHeight;
  export let margin

  $: dataSelected = ($neerslagIndicatoren.includes($indicatorSelection))
    ? $indicatorData[$indicatorSelection].filter(d => d.regime === $regimeSelection)[0] 
    : $indicatorData[$indicatorSelection].filter(d => +d.index === $gridSelection)[0] 
  
  $: datalist_laag = [
    {'period':'Huidig klimaat', 'median':dataSelected.ref, 'p5':dataSelected.ref_p5, 'p95':dataSelected.ref_p95},
    {'period':'2050', 'median':dataSelected['2050laag'], 'p5':dataSelected['2050laag_p5'], 'p95':dataSelected['2050laag_p95']},
    {'period':'2100', 'median':dataSelected['2100laag'], 'p5':dataSelected['2100laag_p5'], 'p95':dataSelected['2100laag_p95']}
  ]
  $: datalist_hoog = [
    {'period':'Huidig klimaat', 'median':dataSelected.ref, 'p5':dataSelected.ref_p5, 'p95':dataSelected.ref_p95},
    {'period':'2050', 'median':dataSelected['2050hoog'], 'p5':dataSelected['2050hoog_p5'], 'p95':dataSelected['2050hoog_p95']},
    {'period':'2100', 'median':dataSelected['2100hoog'], 'p5':dataSelected['2100hoog_p5'], 'p95':dataSelected['2100hoog_p95']}
  ]

  const areaPath = area()
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
    selectAll('.rough g g').remove()

    createRoughArea(datalist_hoog, 45, 'red', svgElementHoog)
    createRoughArea(datalist_laag, -45, '#17A3D3', svgElementLaag)

    select('.whiterect')
      // .raise()
      .transition('ease').duration(2000).ease(easeQuadOut)
      .attr('x', w*1.8)
    
    selectAll('.rough g g').style('opacity', '0.2')
  })

  function mouseOverGraph(period){graphHover.set(period)}
  function mouseOutGraph(){graphHover.set(null)}

</script>

<g class='graph-content'>
  <g class='rough' height={h} width={w}>
    <g class='scenario-laag' bind:this={svgElementLaag}></g>
    <g class='scenario-hoog' bind:this={svgElementHoog}></g>
    <GradientDefs />
  </g>

  <g pointer-events='none'>
    <GraphContentLines {xScale} {yScale} {datalist_laag} {datalist_hoog} />

    <GraphContentCircles {xScale} {yScale} {datalist_laag} {datalist_hoog} />
  </g>

  <g class='current-map-selection'>
    <g transform='translate({xScale($periodName)},{yScale(dataSelected[$periodSelection])})'>
      <circle r='5' fill='none' stroke='cyan' stroke-width='3'/>
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

<rect class='gradientrect' pointer-events='none' x={-5} y={margin.top} width={w+10} height={innerHeight-margin.top} 
  fill={($graphHover === 'Current climate') 
          ? 'url(#huidigGradient)' 
          : ($graphHover === '2050') 
            ? 'url(#2050Gradient)' 
            : ($graphHover === '2100') 
              ? 'url(#2100Gradient)' 
              : 'none'} />

<GraphLegend {xScale} {yScale} {w} h={innerHeight} {margin} />

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
