<script>
  import * as d3 from 'd3';
  import { afterUpdate, onMount } from 'svelte';
  import GraphContent from './GraphContent.svelte';
  import { indicatorData, indicatorSelection } from '$lib/stores';

  export let w
  export let h

  $: titleHeight = 0.2*h
  $: graphHeight = 0.8*h

  const margin = {top:h/15, left:60, bottom:100, right:60}
  $: innerWidth = w - margin.left - margin.right
  $: innerHeight = graphHeight - margin.bottom - margin.top

  $: xScale = d3.scalePoint()
    .domain(['Huidig klimaat', 'Klimaat 2050', 'Klimaat 2100'])
    .range([0, innerWidth-margin.right])

  $: yScale = d3.scaleLinear()
    .domain([0,d3.max($indicatorData[$indicatorSelection].map(d => d['2100hoog_p95']))])
    .range([innerHeight, margin.top])
    .nice()

  $: xAxis = d3.axisBottom(xScale).ticks(3)
  $: yAxis = d3.axisLeft(yScale)

  afterUpdate(() => d3.select('.xAxis').call(xAxis), [xAxis]);

  afterUpdate(() => {
    d3.select('.yAxis').call(yAxis)
    d3.selectAll('.domain').attr('stroke', 'lightgrey')
    d3.selectAll('.tick line').attr('stroke', 'lightgrey')
  });

</script>

<div class='title' style='height:{titleHeight}px'>
  <h3>Statistieken voor locatie op kaart</h3>
</div>
<div class='graph-div' style='height:{graphHeight}px'>
  <svg class='graph-svg'>

    <g class='graph-g' transform='translate({margin.left},{margin.top})'>
      <g class='xAxis' transform='translate({0},{innerHeight})' style='font-size:16px'></g>
      <g class='yAxis' transform='translate({0},{0})'></g>
      <GraphContent {xScale} {yScale} {innerHeight}
        w={innerWidth} h={innerHeight}/>
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