<script>
  import { scalePoint, scaleLinear, select, selectAll, axisBottom, axisLeft, max } from 'd3';
  import { afterUpdate } from 'svelte';
  import GraphContent from './GraphContent.svelte';
  import { indicatorData, indicatorSelection, indicatorSelectionMetaData, neerslagIndicatoren } from '$lib/stores';

  export let w
  export let h

  $: hoogsteWaarde = ($neerslagIndicatoren.includes($indicatorSelection))
    ? '2100hoog'
    : (['Number of frost days', 'Number of ice days', 'Heating degree days', 'Summer precipitation'].includes($indicatorSelection))
      ? 'ref_p95'
      : '2100hoog_p95'

  $: titleHeight = 0.2*h
  $: graphHeight = 0.8*h

  const margin = {top:10, left:60, bottom:250, right:100}
  $: innerWidth = w - margin.left - margin.right
  $: innerHeight = graphHeight - margin.bottom - margin.top

  $: xScale = scalePoint()
    .domain(['Current climate', '2050', '2100'])
    .range([0, innerWidth])
  
  $: yScale = scaleLinear()
    .domain([0,max($indicatorData[$indicatorSelection].map(d => +d[hoogsteWaarde]))])
    .range([innerHeight, margin.top])
    .nice()

  $: xAxis = axisBottom(xScale).ticks(3)
  $: yAxis = axisLeft(yScale)

  afterUpdate(() => select('.xAxis').call(xAxis), [xAxis]);

  afterUpdate(() => {
    select('.yAxis').call(yAxis)
    selectAll('.domain').attr('stroke', 'lightgrey')
    selectAll('.tick line').attr('stroke', 'lightgrey')
  });

</script>

<div class='title' style='height:{titleHeight}px'>
  <div class='title-white-bg'>
    <h3 style='color:grey'>Statistics for location on map</h3>
    <!-- <p style='font-style:italic; font-size:14px'>Beweeg de muis over de grafiek of legenda voor meer info</p> -->
  </div>
</div>
<div class='graph-div' style='height:{graphHeight}px'>
  <svg class='graph-svg'>

    <g class='graph-g' transform='translate({margin.left},{margin.top})'>
      <g class='xAxis' transform='translate({0},{innerHeight})' style='font-size:14px'></g>
      <g class='yAxis' transform='translate({0},{0})'></g>
      <g class='yAxisLabel' transform='translate({-35},{margin.top + innerHeight/2}) rotate(-90)'>
        <text text-anchor='start' style='font-size:14px'>{$indicatorSelectionMetaData['y-as titel']}</text>
      </g>
      <GraphContent {xScale} {yScale} {innerHeight}
        w={innerWidth} h={innerHeight} {margin}/>
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