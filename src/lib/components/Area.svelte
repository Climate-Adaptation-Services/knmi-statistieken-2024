
<script>
  import * as d3 from 'd3';
  import { afterUpdate } from 'svelte';
  import rough from 'roughjs';
  import { gridSelection, colorScale } from '$lib/stores';

  export let xScale;
  export let yScale;
  export let w;
  export let h;
  export let datajson;
  export let innerHeight;

  const ref = datajson[1]
  const laag = datajson[2]
  const hoog2050 = datajson[3]
  const hoog2100 = datajson[4]

  $: refValue = ref.features.filter(d => d.properties.Id === $gridSelection)[0].properties.gridcode
  $: laagValue = laag.features.filter(d => d.properties.Id === $gridSelection)[0].properties.gridcode
  $: hoog2050Value = hoog2050.features.filter(d => d.properties.Id === $gridSelection)[0].properties.gridcode
  $: hoog2100Value = hoog2100.features.filter(d => d.properties.Id === $gridSelection)[0].properties.gridcode

  $: data = [
    {'period':'Huidig', 'laag':refValue, 'hoog':refValue},
    {'period':'Klimaat 2050', 'laag':laagValue, 'hoog':hoog2050Value},
    {'period':'Klimaat 2100', 'laag':laagValue, 'hoog':hoog2100Value}
  ]

  const areaPath = d3.area()
    .x(d => xScale(d.period))
    .y0(d => yScale(d.laag))
    .y1(d => yScale(d.hoog))

  let svgElement;
  afterUpdate(() => {
    d3.select('.rough g').remove()
    const rc = rough.svg(svgElement);

    const path = rc.path(areaPath(data),
      { 
        roughness: 0.8, 
        fill: 'url("#roughGradient")', 
        stroke: 'none',
        fillStyle:'hachure',
        fillWeight: 1,
        hachureGap: 0.5,
        hachureAngle: 45,
        strokeWidth: 2
      });
    svgElement.appendChild(path);

    d3.select('.whiterect')
      .raise()
      .transition('ease').duration(2000).ease(d3.easeQuadOut)
      .attr('x', w)
      
  })

</script>

<g class='rough' bind:this={svgElement} height={h} width={w}>
  <defs>
    <linearGradient id="roughGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color={$colorScale(hoog2100Value)} />
      <stop offset="100%" stop-color={$colorScale(laagValue)} />
    </linearGradient>
  </defs>
</g>
<g class='circles'>
  {#each [['Klimaat 2050', laagValue], ['Klimaat 2100', laagValue], ['Klimaat 2050', hoog2050Value], ['Klimaat 2100', hoog2100Value]] as circleData, i}
    <g transform='translate({xScale(circleData[0])},{yScale(circleData[1])})'>
      {#if i < 2}
        <line y1={0} y2={innerHeight - yScale(laagValue)} stroke='#8E8883' stroke-dasharray="4 4" stroke-width='2'/>
      {/if}
      <circle fill={$colorScale(circleData[1])} r='4' stroke='black'/>
      <text text-anchor='end' dx='-0.4em' dy={(i > 1) ? '-0.4em' : '1.3em'}>{circleData[1]}</text>
    </g>
  {/each}
</g>
<rect class='whiterect' x={0} width={w} height={h-2} fill='white'/>


