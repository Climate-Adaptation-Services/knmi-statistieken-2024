
<script>
  import * as d3 from 'd3';
  import { afterUpdate } from 'svelte';
  import rough from 'roughjs';
  import { gridSelection, colorScale } from '$lib/stores';

  export let xScale;
  export let yScale;
  export let w;
  export let h;
  export let data;
  export let innerHeight;

  $: dataSelected = data.tropische_dagen.filter(d => +d.index === $gridSelection)[0]

  $: datalist_laag = [
    {'period':'Huidig klimaat', 'p5':dataSelected.ref, 'p95':dataSelected.ref},
    {'period':'Klimaat 2050', 'p5':dataSelected['2050laag_p5'], 'p95':dataSelected['2050laag_p95']},
    {'period':'Klimaat 2100', 'p5':dataSelected['2100laag_p5'], 'p95':dataSelected['2100laag_p95']}
  ]
  $: datalist_hoog = [
    {'period':'Huidig klimaat', 'p5':dataSelected.ref, 'p95':dataSelected.ref},
    {'period':'Klimaat 2050', 'p5':dataSelected['2050hoog_p5'], 'p95':dataSelected['2050hoog_p95']},
    {'period':'Klimaat 2100', 'p5':dataSelected['2100hoog_p5'], 'p95':dataSelected['2100hoog_p95']}
  ]

  $: console.log('datalist', datalist_laag)

  const areaPath = d3.area()
    .x(d => xScale(d.period))
    .y0(d => yScale(d.p5))
    .y1(d => yScale(d.p95))

  function createRoughArea(datalist, rc, angle, color){
    const path = rc.path(areaPath(datalist),
      { 
        roughness: 0.4, 
        fill: color, 
        stroke: 'none',
        fillStyle:'hacure',
        fillWeight: 1.5,
        hachureGap: 2,
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
      .attr('x', w)
    
    d3.selectAll('.rough g').style('opacity', '0.3')

      
  })

</script>

<g class='rough' bind:this={svgElement} height={h} width={w}>
  <defs>
    <linearGradient id="roughGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color={'grey'} />
      <stop offset="100%" stop-color={'grey'} />
    </linearGradient>
  </defs>
</g>
<g class='circles'>
  {#each [datalist_laag, datalist_hoog] as datalist, j}
    {#each [['Klimaat 2050', datalist[1].p5], ['Klimaat 2100', datalist[2].p5], ['Klimaat 2050', datalist[1].p95], ['Klimaat 2100', datalist[2].p95]] as circleData, i}
      <g transform='translate({xScale(circleData[0])},{yScale(circleData[1])})'>
        {#if i < 2 && j === 0}
          <line y1={0} y2={innerHeight - yScale(datalist[1].p5)} stroke='#8E8883' stroke-dasharray="4 4" stroke-width='2'/>
        {/if}
        <circle fill={(j === 0) ? '#17A3D3' : 'red'} r='4' stroke='black'/>
        <text text-anchor={(circleData[0] === 'Klimaat 2050') ? 'end' : ''} dx={(circleData[0] === 'Klimaat 2050') ? '-0.5em' : '0.5em'} dy={(i > 1) ? '-0.4em' : '1.1em'}>{Math.round(circleData[1]*10)/10}</text>
      </g>
    {/each}
  {/each}
</g>
<rect class='whiterect' x={0} width={w} height={h-2} fill='#fcfbf2'/>


