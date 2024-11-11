<script>
  import * as d3 from 'd3';
  import { t } from '$lib/i18n/translate';

  export let dataProjection
  // export let dataHistoric
  export let linesData
  export let xScale
  export let yScale
  export let height
  export let areaOpacity
  export let margin

  import { hoveredYear } from '$lib/stores';

  const hoverBarWidth = xScale(dataProjection[1].Jaar) - xScale(dataProjection[0].Jaar);

</script>


<g class='hover'>
  {#if $hoveredYear !== null}
  <g>
    <!-- {/* Group to show hovered year and value ranges */} -->
    <g
      transform={`translate(${margin.left-10},${margin.top})`}
      opacity='1'
    >
      <!-- {/* Hovered year */} -->
      <text
        x='50'
        y='0'
        class='legendYear'
        font-size='24'
      >{$hoveredYear}</text>
      {#if $hoveredYear > 1995}
        <text
          x='64'
          y='30'
          class='legendYear'
          font-size='14'
        >{t('Mediaan')}</text>
        <text
          x='135'
          y='30'
          class='legendYear'
          font-size='14'
        >Range</text>
        <!-- {/* Value ranges */} -->
        {#each linesData as d, i}
          <g font-size='16'>
            <text
              style='fill:{d.color}'
              class='legendCircles'
              x='-5'
              y={35 + (linesData.length - i) * 20}
            >{d.legendText}</text>
            <text
              style='fill:{d.color}'
              class='legendCircles'
              x='64'
              y={35 + (linesData.length - i) * 20}
            >{Math.round(dataProjection.filter(d2 => d2.Jaar === $hoveredYear)[0][d.median]) + ' cm'}</text>
            <text
              style='fill:{d.color}'
              class='legendCircles'
              x='135'
              y={35 + (linesData.length - i) * 20}
            >{Math.round(dataProjection.filter(d2 => d2.Jaar === $hoveredYear)[0][d.variableLow]) + ' - ' + Math.round(dataProjection.filter(d => d.Jaar === $hoveredYear)[0][d.variableHigh]) + ' cm'}</text>
          </g>
        {/each}
      {/if}
    </g>

    <!-- { /* dashed line to make extra clear what is hovered */ } -->
    <path
      d={d3.line()([[xScale($hoveredYear), 0], [xScale($hoveredYear), height]])}
      stroke={'grey'}
      opacity='0.5'
      stroke-width='1.8'
      fill="none"
      stroke-dasharray="5,5"
    />

    <!-- { /* line to indicate range of each area */ } { -->
      {#each linesData as d,i}
        <rect
          fill={d.color}
          opacity={areaOpacity}
          x={xScale($hoveredYear) - 1.5}
          y={yScale(dataProjection.filter(d2 => d2.Jaar === $hoveredYear)[0][d.variableHigh])}
          height={yScale(dataProjection.filter(d2 => d2.Jaar === $hoveredYear)[0][d.variableLow])-
            yScale(dataProjection.filter(d2 => d2.Jaar === $hoveredYear)[0][d.variableHigh])}
          width='2'
        />
      {/each}

    <!-- { /* circles to indicate the low and high bounds per area */ } { -->
      {#if $hoveredYear > 1995}
        {#each linesData as d,i}
          <g>
            <circle
              r='4'
              stroke='white'
              stroke-width='2'
              fill={d.color}
              cx={xScale($hoveredYear)}
              cy={yScale(dataProjection.filter(d => d.Jaar === $hoveredYear)[0][d.variableLow])}
            />
            <circle
              r='4'
              stroke='white'
              stroke-width='2'
              fill={d.color}
              cx={xScale($hoveredYear)}
              cy={yScale(dataProjection.filter(d => d.Jaar === $hoveredYear)[0][d.variableHigh])}
            />
          </g>
        {/each}
      {/if}
    </g>
  {:else}
    <g transform={`translate(${margin.left+90},${margin.top+40})`}>
      <text font-style='italic' text-anchor='middle' fill='#808080'>
        <tspan>{t('Beweeg de muis over de grafiek')}</tspan>
        <tspan x=0 y='1em'>{t('om meer detail de tonen')} </tspan>
      </text>
      
    </g>
  {/if}

  <!-- {/* rects for hovering */} -->
  {#each dataProjection as d,i}
    <rect
      width={hoverBarWidth+5}
      height={height+40}
      fill='steelblue'
      x={xScale(dataProjection[i].Jaar) - hoverBarWidth/2 - 0.25}
      y='0'
      fill-opacity='0'
      on:mouseover={() => hoveredYear.set(dataProjection[i].Jaar)}
      on:mouseout={() => hoveredYear.set(null)}
    />
  {/each}
</g>