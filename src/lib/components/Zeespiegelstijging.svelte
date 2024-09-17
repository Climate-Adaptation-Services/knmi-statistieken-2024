<script>
  import * as d3 from 'd3';
  import { t } from '$lib/i18n/translate';

  import XAxis from './axes/XAxis.svelte';
  import YAxis from './axes/YAxis.svelte';
  import Line from './Line.svelte';
  import Area from './Area.svelte'
  import ZeespiegelHover from './ZeespiegelHover.svelte';

  export let dataProjection;
  export let w;
  export let h;
  // export let dataLLHI

  console.log(dataProjection)

  // const dataHistoric = data.zeespiegel_historisch;
  
  $: margin = {bottom:h*0.25, top:70, left:100, right:w*0.1}
  $: innerWidth = w - margin.left - margin.right
  $: innerHeight = h - margin.top - margin.bottom

  $: xScale = d3
    .scaleLinear()
    .domain([
      1900,
      dataProjection[dataProjection.length - 1].Jaar
    ])
    .range([50, innerWidth])
  // .nice()

  $: yScale = d3
    .scaleLinear()
    .domain([
      -20,
      150
    ])
    .range([innerHeight, margin.top])
    .nice()

  const xAxisTickFormat = number => d3
    .format('d')(number)
    .replace(',', '')

  // Add scales to axis
  $: xAxis = d3
    .axisBottom(xScale)
    .ticks(12)
    .tickFormat(xAxisTickFormat);

  const yAxisTickFormat = number => d3
    .format('.3s')(number)
    .replace('.000', "")
    .replace('.00', "")
    .replace('.0', "")

  // Add scales to axis
  $: yAxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickFormat(yAxisTickFormat);

  const colorGematigd = '#17A3D3'
  const colorSterk = 'red'

  const median_lines = [
    {
      'median':'Lage uitstootscenario',
      'variableLow': 'Lage uitstootscenario-range (low)',
      'variableHigh': 'Lage uitstootscenario-range (high)',
      'color': colorGematigd,
      'legendText': 'Laag',
      'hachureAngle': '140',
      'legendText2': 'Met gematigde',
      'y_offset_text': ['48', '62']
    }, {
      'median':'Hoge uitstootscenario',
      'variableLow': 'Hoge uitstootscenario-range (low)',
      'variableHigh': 'Hoge uitstootscenario-range (high)',
      'color': colorSterk,
      'legendText': 'Hoog',
      'hachureAngle': '60',
      'legendText2': 'Met sterke',
      'y_offset_text': ['53', '67']
    }
  ]
  const areaOpacity = '0.6';

</script>

<svg id="svg_zeespiegel_chart">

  <XAxis scale={xScale} xTransform={0} yTransform={innerHeight} className="lineChart__xAxis" axis={xAxis}/>
  <YAxis xTransform={50} yTransform={0} scale={yScale} className="lineChart__yAxis" axis={yAxis}/>
  <text text-anchor='middle' transform='translate(15, {yScale(70)}) rotate(-90)'>{t('Stijging in cm')}</text>
  
  <Line data={dataProjection.slice(0,100)} color={'black'} variable='Trend metingen' legendText='Median' xScale={xScale} yScale={yScale} className={'trend'} {margin} />
  <Line data={dataProjection.slice(0,123)} color={'grey'} variable='Jaargemiddelde' legendText='Median' xScale={xScale} yScale={yScale} className={'jaargemiddelde'} {margin}/>

  <g class='trendlijn' transform='translate({10},{yScale(18)})'>
    <line x1={xScale(1912)} x2={xScale(1920)} stroke='black' stroke-width='2.2'/>
    <text x={xScale(1924)} font-size='12' dy='0.36em'>{t('Trend metingen')}</text>
  </g>
  <g class='jaargemiddeldelijn' transform='translate({10},{yScale(26)})'>
    <line x1={xScale(1912)} x2={xScale(1915)} y1={2} y2={8} stroke='grey' stroke-width='1'/>
    <line x1={xScale(1915)} x2={xScale(1918)} y1={8} y2={-8} stroke='grey' stroke-width='1'/>
    <line x1={xScale(1918)} x2={xScale(1921)} y1={-8} y2={2} stroke='grey' stroke-width='1'/>
    <text x={xScale(1924)} font-size='12' dy='0.36em'>{t('Jaargemiddelde')}</text>
  </g>

  {#each median_lines as median_line}
    <g>
      <Line data={dataProjection.slice(95)} color={median_line.color} variable={median_line.median} legendText='Median' xScale={xScale} yScale={yScale} className={'median' + median_line.legendText} {margin} />

      <Area className={'areaChart' + median_line.legendText} data={dataProjection} 
        variable1={median_line.variableLow} variable2={median_line.variableHigh} 
        color={median_line.color} opacity={areaOpacity} xScale={xScale} yScale={yScale} 
        width={innerWidth} height={innerHeight} hachureAngle={median_line.hachureAngle} fillStyle='hachure' 
        hachureGap='4'/>
      
      <!-- <text x={innerWidth + 9} y={yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 48} className='legendText' style='fill:{median_line.color}' opacity={areaOpacity + 0.2}>
        {median_line.legendText2}
      </text>
      <text 
        x={innerWidth + 9} 
        y={yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 62}
        class='legendText' 
        style='fill:{median_line.color}'
        opacity={areaOpacity + 0.2}>
        klimaatverandering 
      </text> -->
    </g>
  {/each}


  <!-- <path d="M{margin.left + 50},{yScale(dataHistoric[parseInt(dataHistoric.length/2)]['Stijging'])-44} l0,32" stroke='black' fill='none' stroke-width='0.8' stroke-dasharray="5,2"/> -->

  <ZeespiegelHover dataProjection={dataProjection} linesData={median_lines} xScale={xScale} yScale={yScale} height={innerHeight} areaOpacity={areaOpacity} {margin}/>

</svg>

<style>
  svg{
    width:100%;
    height:100%;
  }

  .legendYear {
    font-weight: normal;
    font-size: 17px;
  }

  .legendCircles {
    font-weight: normal;
    font-size: 11px;
  }

  .legendText {
    font-size: 13px;
    font-weight: normal;
  }

</style>

