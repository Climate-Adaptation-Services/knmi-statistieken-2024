<script>
  import { colorScale, gridSelectionValue } from "$lib/stores";
  import { axisLeft, select, selectAll, scaleLinear } from "d3";
  import { afterUpdate } from "svelte";

  export let w;
  export let h;

  const margin = {top:h/3, left:70, bottom:h/5, right:20}
  $: innerWidth = w - margin.left - margin.right
  $: innerHeight = h - margin.top - margin.bottom

  $: legendScale = scaleLinear()
    .domain($colorScale.domain())
    .range([innerHeight, 0])
    .nice()

  $: yAxis = axisLeft(legendScale).ticks(6)

  afterUpdate(() => {
    select('.legendAxis').call(yAxis)
    selectAll('.domain').attr('stroke', 'lightgrey')
    selectAll('.tick line').attr('stroke', 'lightgrey')
  });

</script>

<svg>
  <defs>
    <linearGradient id="legend-gradient" gradientTransform="rotate(90)">
      <stop stop-color="red" offset="0%" />
      <stop stop-color="white" offset="100%" />
    </linearGradient>
  </defs>
  <g transform='translate({margin.left},{margin.top})'>
    <rect x='0' y='0' width='30' stroke='black' stroke-width='0.2' height={innerHeight} fill='url(#legend-gradient)'/>
    <g class='legendAxis' transform='translate({0},{0})' style='font-size:13px'></g>
    <line y1={legendScale($gridSelectionValue)} x1='0' x2='30' y2={legendScale($gridSelectionValue)} stroke='cyan' stroke-width='4'/>
    <text font-size='18' y={legendScale($gridSelectionValue) + 5} x='35'>{Math.round(10*$gridSelectionValue)/10}</text>
  </g>
</svg>





<style>
  svg{
    width:100%;
    height:100%;
  }

</style>