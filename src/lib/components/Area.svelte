
<script>
  import * as d3 from 'd3';
  import { afterUpdate } from 'svelte';
  import rough from 'roughjs';

  export let data;
  export let color;
  export let opacity;
  export let variable1;
  export let variable2;
  export let xScale;
  export let yScale;
  export let className;
  export let width;
  export let height;
  export let hachureAngle;
  export let fillStyle;
  export let hachureGap;
 
  const areaPath = d3
    .area()
    .x(d => +xScale(d.Jaar))
    .y0(d => +yScale(d[variable1]))
    .y1(d => +yScale(d[variable2]))

  let svgElement;

  afterUpdate(() => {
    d3.select('.rough' + className + ' g').remove()
    const rc = rough.svg(svgElement);

    const path = rc.path(areaPath(data),
      { 
        roughness: 0, 
        fill: color, 
        stroke: 'none',
        fillStyle:'solid',
        fillWeight: 3,
        hachureGap: 6,
        hachureAngle: 0,
        strokeWidth: 2,
      });
    svgElement.appendChild(path);
    
    d3.selectAll('.rough'+className).style('opacity', '0.2')
  
  })

</script>

<g class={'rough'+className} bind:this={svgElement} height={height} width={width}></g>

