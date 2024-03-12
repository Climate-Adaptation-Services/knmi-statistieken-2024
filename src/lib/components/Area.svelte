
<script>
  import * as d3 from 'd3';
  import { afterUpdate } from 'svelte';
  import rough from 'roughjs';
  import { gridSelection } from '$lib/stores';

  export let xScale;
  export let yScale;
  export let width;
  export let height;
  export let datajson;

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
        roughness: 0.6, 
        fill: 'black', 
        stroke: 'none',
        fillStyle:'hachure',
        fillWeight: 1,
        hachureGap: 4,
        hachureAngle: 45,
        strokeWidth: 2
      });
    svgElement.appendChild(path);
  })

</script>

<g class='rough' bind:this={svgElement} height={height} width={width}></g>

