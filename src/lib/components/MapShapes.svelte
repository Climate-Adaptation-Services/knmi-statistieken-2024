<script>
  import { afterUpdate, onMount } from "svelte";
  import { circleFeatures, colorScale, gridSelection, gridHover, indicatorData, indicatorSelection, periodSelection } from "$lib/stores";
  import { select, selectAll } from "d3";

  export let projection
  export let w

  $: circleDistanceX = projection($circleFeatures[1].geometry.coordinates)[0] - projection($circleFeatures[0].geometry.coordinates)[0]
  $: circleDistanceY = projection($circleFeatures[1].geometry.coordinates)[1] - projection($circleFeatures[2].geometry.coordinates)[1]

  const gridcode = 'cellen_lat_lon_XYTableToPoint1_cellen'

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
  let rects
  onMount(() => {
    const circlesAndRects = select(".rasterdata")

    circles = circlesAndRects.selectAll('circle')
      .data($circleFeatures)
      .join("circle")
        .attr("class", feature => 'rasterblokje ' + 'id-' + feature.properties[gridcode])
        .attr('fill', feature => $colorScale(+$indicatorData[$indicatorSelection].filter(d => +d.index === feature.properties[gridcode])[0][$periodSelection]))
        .attr('stroke', 'white')
        .attr('stroke-width', '1')
        .style('pointer-events', 'none')
    
    rects = circlesAndRects.selectAll('rect')
      .data($circleFeatures)
      .join("rect")
        .attr("class", 'hoverRect')
        .attr('fill', feature => $colorScale(+$indicatorData[$indicatorSelection].filter(d => +d.index === feature.properties[gridcode])[0][$periodSelection]))
        .attr('stroke', 'black')
        .attr('stroke-opacity', '0')
        .attr('fill-opacity', '0')
        .on('click', (e, feature) => click(feature))
        .on('mouseover', (e,feature) => mouseOver(feature))
        .on('mouseout', (e, feature) => mouseOut(feature))
  })

  // dit is om responsive te zijn bij screen resize
  afterUpdate(() => {
    circles
      .attr('cx', feature => projection(feature.geometry.coordinates)[0])
      .attr('cy', feature => projection(feature.geometry.coordinates)[1])
      .attr('r', w/110)

    rects
      .attr('x', feature => projection(feature.geometry.coordinates)[0] - circleDistanceX/2 - 0.1)
      .attr('y', feature => projection(feature.geometry.coordinates)[1] - circleDistanceY/2 - 0.1)
      .attr('width', circleDistanceX+0.2)
      .attr('height', circleDistanceY+0.2)
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

<g class='rasterdata'></g>


<style>
</style>