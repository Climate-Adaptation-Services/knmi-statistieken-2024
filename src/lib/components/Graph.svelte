<script>
  import * as d3 from 'd3';
  import { afterUpdate, onMount } from 'svelte';
  import Area from './Area.svelte';

  export let w
  export let h
  export let datajson

  $: titleHeight = 0.2*h
  $: graphHeight = 0.8*h

  const margin = {top:60, left:40, bottom:160, right:40}
  $: innerWidth = w - margin.left - margin.right
  $: innerHeight = graphHeight - margin.bottom - margin.top

  $: xScale = d3.scalePoint()
    .domain(['Huidig', 'Klimaat 2050', 'Klimaat 2100'])
    .range([0, innerWidth-margin.right])

  $: yScale = d3.scaleLinear()
    .domain([0,350])
    .range([innerHeight, margin.top])
    .nice()

  $: xAxis = d3.axisBottom(xScale).ticks(3)
  $: yAxis = d3.axisLeft(yScale)

  afterUpdate(() => d3.select('.xAxis').call(xAxis), [xAxis]);
  afterUpdate(() => {
    d3.select('.yAxis').call(yAxis)
    d3.selectAll('.domain').attr('stroke', 'lightgrey')
    d3.selectAll('.tick line').attr('stroke', 'lightgrey')
  },[yAxis]);

</script>

<div class='title' style='height:{titleHeight}px'>
  <h3>Statistieken voor locatie op kaart</h3>
</div>
<div class='graph-div' style='height:{graphHeight}px'>
  <svg class='graph-svg'>

    <g class='graph-g' transform='translate({margin.left},{margin.top})'>
      <g class='xAxis' transform='translate({0},{innerHeight})' style='font-size:16px'></g>
      <Area {datajson} {xScale} {yScale}
        w={innerWidth} h={innerHeight}/>
      <g class='yAxis' transform='translate({0},{0})'></g>
    </g>
  </svg>
</div>

<style>
  .title{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  } 

</style>