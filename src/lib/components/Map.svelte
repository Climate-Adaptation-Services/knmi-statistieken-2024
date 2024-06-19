<script>
// @ts-nocheck
  import { color, geoMercator, geoPath, scaleLinear, select, selectAll } from 'd3';
  import { colorScale, gridSelection, periodSelection, indicatorData, gridHover, indicatorSelection, periodName, indicatorMetaData, period_options, circleFeatures } from '$lib/stores';
  import { afterUpdate, onMount } from 'svelte';
  import Legend from './Legend.svelte';

  export let datajson
  export let w
  export let h
  export let NLsteden

  const provincies = datajson[0]
  const cellen = datajson[1];


  console.log('datajson', datajson)

  const gridcode = 'cellen_lat_lon_XYTableToPoint1_cellen'
  circleFeatures.set(cellen.features)

  const legendMargin = 50

  $: titleHeight = 0.2*h
  $: mapHeight = 0.8*h

  $: projection = geoMercator()
    .fitExtent([[60,10],[w-20-legendMargin, mapHeight - 40]], provincies)
  
  $: path = geoPath(projection);

  $: circleDistanceX = projection(cellen.features[1].geometry.coordinates)[0] - projection(cellen.features[0].geometry.coordinates)[0]
  $: circleDistanceY = projection(cellen.features[1].geometry.coordinates)[1] - projection(cellen.features[2].geometry.coordinates)[1]

  $: console.log(circleDistanceX, circleDistanceY)

  const firstIndicator = $indicatorMetaData.filter((ind) => ind['Indicator'] === 'Tropische dagen')[0]

  colorScale.set(
    scaleLinear()
    .domain(firstIndicator['y-as domein'].split(','))
    .range(firstIndicator['Kleuren'].split(','))
  )

  afterUpdate(() => select('.id-' + $gridSelection).raise())

  function click(feature){
    select('.whiterect').interrupt('ease').attr('x', 0)
    gridSelection.set(feature.properties[gridcode])

    selectAll('.rasterblokje').attr('stroke', 'white').attr('stroke-width', '1')
    select('.id-' + feature.properties[gridcode]).attr('stroke', 'cyan').attr('stroke-width', '3')
  }

  function mouseOver(feature){
    gridHover.set(feature.properties[gridcode])
    select('.id-' + $gridHover).raise()
    if(feature.properties[gridcode] !== $gridSelection){
      select('.id-' + feature.properties[gridcode]).attr('stroke', 'grey')
    }
  }

  function mouseOut(feature){
    gridHover.set(null)
    if(feature.properties[gridcode] !== $gridSelection){
      select('.id-' + feature.properties[gridcode]).attr('stroke', 'white')
    }
  }

  let circles
  onMount(() => {
    const circlesAndRects = select(".rasterdata")

    circles = circlesAndRects.selectAll('circle')
      .data($circleFeatures)
      .enter()
      .append("circle")
        .attr("class", feature => 'rasterblokje ' + 'id-' + feature.properties[gridcode])
        .attr('fill', feature => $colorScale(+$indicatorData[$indicatorSelection].filter(d => +d.index === feature.properties[gridcode])[0][$periodSelection]))
        .attr('cx', feature => projection(feature.geometry.coordinates)[0])
        .attr('cy', feature => projection(feature.geometry.coordinates)[1])
        .attr('r', w/110)
        .attr('stroke', 'white')
        .attr('stroke-width', '1')
        .style('pointer-events', 'none')
    
    circlesAndRects.selectAll('rect')
    .data($circleFeatures)
      .enter()
      .append("rect")
        .attr("class", 'hoverRect')
        .attr('fill', feature => $colorScale(+$indicatorData[$indicatorSelection].filter(d => +d.index === feature.properties[gridcode])[0][$periodSelection]))
        .attr('x', feature => projection(feature.geometry.coordinates)[0] - circleDistanceX/2 - 2)
        .attr('y', feature => projection(feature.geometry.coordinates)[1] - circleDistanceY/2 - 2)
        .attr('width', circleDistanceX+4)
        .attr('height', circleDistanceY+4)
        .attr('stroke', 'black')
        .attr('stroke-opacity', '0')
        .attr('fill-opacity', '0')
        .on('click', (e, feature) => click(feature))
        .on('mouseover', (e,feature) => mouseOver(feature))
        .on('mouseout', (e, feature) => mouseOut(feature))
  })

  $: if($indicatorSelection && circles){
    circles
      .transition('1').duration(500).delay((d,i) => Math.random()*i*2)
      .style('opacity', 0.1)
      .transition('trans2').duration(1000).delay((d,i) => Math.random()*i*5)
      .style('opacity', 1)
      .attr('fill', feature => $colorScale(+$indicatorData[$indicatorSelection].filter(d => +d.index === feature.properties[gridcode])[0][$periodSelection]))
  }

</script>

<div class='title' style='height:{titleHeight}px'>
  <div class='title-white-bg'>
    <h3>
      {$indicatorSelection} 
      <strong style='font-size:14px; color:black'>bij </strong>
      {$period_options.filter(po => po.value === $periodSelection)[0].label}
    </h3>
    <!-- <p style='font-style:italic; font-size:14px'>Pas locatie aan op de kaart</p> -->
  </div>
</div>
<div class='map-svg' style='height:{mapHeight}px'>
  <svg>
    {#if $colorScale}
      <Legend w={w*0.2} h={mapHeight}/>
    {/if}
    <g transform='translate({legendMargin},0)'>
      <g class='provincies'>
        {#each provincies.features as feature}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <path
            d={path(feature)}
            class='shape'
            fill='none'
            stroke='grey'
          />
        {/each}
      </g>
      <g class='rasterdata'></g>
      {#each NLsteden as NLstad, i}
        <g class='NLstad' transform='translate({projection([NLstad.lon, NLstad.lat])[0]},{projection([NLstad.lon, NLstad.lat])[1]})'>
          <circle
            fill={'#35575A'}
            stroke='white'
            r='3'
          />
          <text class='stad-text' style='fill:#35575A' font-size={w/60} y='1.32em' text-anchor='middle'>
            {NLstad.Stad}
          </text>
        </g>
      {/each}
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

  .NLstad{
    pointer-events: none;
  }

  .stad-text{
    stroke-linecap: butt;
    stroke-linejoin: miter;
    stroke:white;
    stroke-width:1.5;
    paint-order:stroke;
    fill:black;
  }

</style>