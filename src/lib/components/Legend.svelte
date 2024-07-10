<script>
  import { colorScale, gridHoverValue, gridSelectionValue, indicatorSelectionMetaData, temperatuurIndicatoren, neerslagIndicatoren, indicatorSelection } from "$lib/stores";
  import { axisLeft, select, selectAll, scaleLinear, extent } from "d3";
  import { afterUpdate } from "svelte";

  export let w;
  export let h;

  const margin = {top:50, left:80, bottom:h/2, right:20}
  $: innerWidth = w - margin.left - margin.right
  $: innerHeight = h - margin.top - margin.bottom

  $: legendScale = scaleLinear()
    .domain(extent($colorScale.domain()))
    .range([innerHeight, 0])
    // .nice()

  $: yAxis = axisLeft(legendScale).ticks(6)

  afterUpdate(() => {
    select('.legendAxis').call(yAxis)
    selectAll('.domain').attr('stroke', 'lightgrey')
    selectAll('.tick line').attr('stroke', 'lightgrey')
  });

  function rounding(value){
    return ($neerslagIndicatoren.includes($indicatorSelection) || $temperatuurIndicatoren.includes($indicatorSelection) )
      ? Math.round(value*10)/10
      : Math.round(value)
  }

</script>

<g class='legend'>
  <defs>
    <linearGradient id="legend-gradient" gradientTransform="rotate(90)">
      {#each $colorScale.range().reverse() as color, i}
        <stop stop-color={color} offset="{(100/($colorScale.domain().length-1))*i}%" />
      {/each}
    </linearGradient>
  </defs>
  <g transform='translate({margin.left},{margin.top})'>
    <text font-size='18' y='-15'>{$indicatorSelectionMetaData['y-as titel']}</text>
    <rect x='0' y='0' width='20' stroke='black' stroke-width='0.2' height={innerHeight} fill='url(#legend-gradient)'/>
    <g class='legendAxis' transform='translate({0},{0})' style='font-size:13px'></g>
    <line y1={legendScale($gridSelectionValue)} x1='0' x2='28' y2={legendScale($gridSelectionValue)} stroke='cyan' stroke-width='4'/>
    {#if !$gridHoverValue}
      <text font-size='18' y={legendScale($gridSelectionValue) + 5} x='35'>{rounding($gridSelectionValue)}</text>
    {/if}
    {#if $gridHoverValue}
      <line y1={legendScale($gridHoverValue)} x1='0' x2='28' y2={legendScale($gridHoverValue)} stroke='grey' stroke-width='4'/>
      <text font-size='18' y={legendScale($gridHoverValue) + 5} x='35'>{rounding($gridHoverValue)}</text>
      {/if}
  </g>
</g>





<style>
  svg{
    width:100%;
    height:100%;
  }

</style>