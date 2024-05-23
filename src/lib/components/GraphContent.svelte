
<script>
  import * as d3 from 'd3';
  import { afterUpdate } from 'svelte';
  import rough from 'roughjs';
  import { gridSelection, colorScale, indicatorData } from '$lib/stores';

  export let xScale;
  export let yScale;
  export let w;
  export let h;
  export let innerHeight;

  $: dataSelected = $indicatorData.tropische_dagen.filter(d => +d.index === $gridSelection)[0]

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

  $: console.log(yScale(datalist_laag[1].p5) - yScale(datalist_laag[1].p95), yScale(datalist_hoog[1].p5) - yScale(datalist_hoog[1].p95), yScale(datalist_hoog[1].p5) - yScale(datalist_hoog[1].p95) - (yScale(datalist_laag[1].p5) - yScale(datalist_laag[1].p95)))
  $: strokeDif = yScale(datalist_hoog[1].p5) - yScale(datalist_hoog[1].p95) - (yScale(datalist_laag[1].p5) - yScale(datalist_laag[1].p95))

  const areaPath = d3.area()
    .x(d => xScale(d.period))
    .y0(d => yScale(d.p5))
    .y1(d => yScale(d.p95))

  function createRoughArea(datalist, rc, angle, color){
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

  let svgElement;
  afterUpdate(() => {
    d3.selectAll('.rough g').remove()
    const rc = rough.svg(svgElement);

    createRoughArea(datalist_hoog, rc, 45, 'red')
    createRoughArea(datalist_laag, rc, -45, '#17A3D3')

    d3.select('.whiterect')
      .raise()
      .transition('ease').duration(2000).ease(d3.easeQuadOut)
      .attr('x', w*1.3)
    
    d3.selectAll('.rough g').style('opacity', '0.2')

      
  })

</script>

<g class='graph-content'>
  <g class='rough' bind:this={svgElement} height={h} width={w}>
    <defs>
      <linearGradient id="roughGradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color={'grey'} />
        <stop offset="100%" stop-color={'grey'} />
      </linearGradient>
    </defs>
  </g>
  <g class='circles'>
    <!-- Eerst alle dashed lines, dan alle circles -->
    {#each [datalist_laag, datalist_hoog] as datalist, j}
      <g class='visible-on-hover dashed-lines'>
        <line stroke={(j === 0) ? '#17A3D3' : 'red'} y2={yScale(datalist[1].p5)} y1={yScale(datalist[1].p95)} x1={xScale(datalist[1].period)} x2={xScale(datalist[1].period)} stroke-dasharray="8 8" stroke-dashoffset={(j === 0) ? -strokeDif/2 : '0'} stroke-width='2.8'/>
        <line stroke={(j === 0) ? '#17A3D3' : 'red'} y2={yScale(datalist[2].p5)} y1={yScale(datalist[2].p95)} x1={xScale(datalist[2].period)} x2={xScale(datalist[2].period)} stroke-dasharray="8 8" stroke-width='2.8'/>
      </g>
      <g class='median-line' stroke='{(j === 0) ? '#17A3D3' : 'red'}'>
        <line x1={xScale('Huidig klimaat')} x2={xScale('Klimaat 2050')} y1={yScale(datalist[0].median)} y2={yScale(datalist[1].median)}/>
        <line x1={xScale('Klimaat 2050')} x2={xScale('Klimaat 2100')} y1={yScale(datalist[1].median)} y2={yScale(datalist[2].median)}/>
        <g font-size='11' font-weight='normal' transform='translate({xScale('Klimaat 2100') + 20},{yScale(datalist[2].median)-8})'>
          <text>Langjarig</text>
          <text y='1em'>gemiddelde</text>
          <text y='2em'>over 30 jaar</text>
        </g>
      </g>
    {/each}
    <g class='visible-on-hover'>
      {#each [datalist_laag, datalist_hoog] as datalist, j}
        {#each [['Huidig klimaat', datalist[0].p5], ['Huidig klimaat', datalist[0].p95], ['Klimaat 2050', datalist[1].p5], ['Klimaat 2100', datalist[2].p5], ['Klimaat 2050', datalist[1].p95], ['Klimaat 2100', datalist[2].p95]] as circleData, i}
          <g transform='translate({xScale(circleData[0])},{yScale(circleData[1])})'>
            <circle fill={(i < 2) 
                ? 'black' 
                : (j === 0)
                  ? '#17A3D3' 
                  : 'red'} 
              r='4' stroke='none'/>
            <text text-anchor={(circleData[0] === 'Klimaat 2050') ? 'end' : ''} dx={(circleData[0] === 'Klimaat 2050') ? '-0.5em' : '0.5em'} dy={(i > 1) ? '-0.4em' : '1.1em'}>{Math.round(circleData[1]*10)/10}</text>
          </g>
        {/each}
      {/each}
    </g>
  </g>
</g>
<rect class='whiterect' x={0} width={w} height={h-2} fill='#fcfbf2'/>


<style>
  .visible-on-hover{
    visibility: hidden;
  }

  .graph-content:hover .visible-on-hover{
    visibility: visible;
  }
</style>
