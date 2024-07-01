<script>
  import { indicatorSelection, colorScale, periodSelection, themeSelection, indicatorMetaData, indicatorSelectionMetaData, period_options, circleFeatures, indicatorData } from '$lib/stores';
  import { select, scaleLinear, selectAll } from 'd3';
  import rough from 'roughjs';
  import { afterUpdate } from 'svelte';
  import Select from 'svelte-select'

  export let w;
  export let h;

  const gridcode = 'cellen_lat_lon_XYTableToPoint1_cellen'

  let indicatorOptions = $indicatorMetaData.filter((ind) => ind.Thema === $themeSelection).map((ind) => {return {label:ind['Indicator'], value:ind['Indicator']}})

  function onChangeIndicator(indicatorName){
    indicatorSelection.set(indicatorName)

    const domain = $indicatorSelectionMetaData['y-as domein'].split(',')
    const range = $indicatorSelectionMetaData['Kleuren'].split(',')
    
    colorScale.set(
      scaleLinear()
      .domain(domain)
      .range(range)
    )
  }


  function onChangePeriod(e){
    periodSelection.set(e.detail.value)
  }

  function onChangeTheme(th){
    themeSelection.set(th)
    indicatorOptions = $indicatorMetaData.filter((ind) => ind.Thema === $themeSelection).map((ind) => {return {label:ind['Indicator'], value:ind['Indicator']}})
    onChangeIndicator(indicatorOptions[0].label)
  }

  $: console.log($indicatorSelectionMetaData)
  
  afterUpdate(() => {
    // ik weet niet waarom deze timeout nodig is
    setTimeout(() => {
      const el_sel = document.getElementsByClassName('selection-div')[0]
      const box_sel = el_sel.getBoundingClientRect()
      select('.more-info')
        .style('left', box_sel.right-35 + 'px')
        .style('top', box_sel.top-12 + 'px')
        .style('visibility', 'visible')
      
      const el_moreinfo = document.getElementsByClassName('more-info')[0]
      const box_moreinfo = el_moreinfo.getBoundingClientRect()
      select('.indicator-info')
        .style('left', box_moreinfo.right+15 + 'px')
        .style('top', box_moreinfo.top-80 + 'px')
    }, 600);
  })

  const themeImageOffset = 10
  $: themeImageSize = (w - 7*themeImageOffset)/4

</script>

{#if w}
  <svg class='roughsvg'>
    <g class='rough-sidepanel'></g>
    <rect width={w} height={h} fill='#35575A'/>
  </svg>
{/if}

<div class='sidepanel-content'>
  <p class='more-info' style='cursor:default'>?</p>
  <div class='indicator-info'>
    <p style='padding:3px 10px 3px 10px; border-radius:50px; color:white;background-color:#36575B; float:left'><strong>{$indicatorSelectionMetaData.Indicator}</strong></p>
    <hr width='100%'>
    <p>{$indicatorSelectionMetaData.Omschrijving}</p>
  </div>
  <h3><strong class='step'>1</strong> Selecteer een thema</h3>
  <div class='themas'>
    <svg style='height:{themeImageSize*1.8}px'>
      {#each ['Hitte', 'Droogte', 'Wateroverlast' , 'Zeespiegelstijging'] as th,i}
        <g class='thema' transform='translate({themeImageOffset*2+(themeImageOffset+themeImageSize)*i},{0})' opacity={($themeSelection !== th) ? '0.4' : '1'}>
          <circle r={themeImageSize/2} cx={themeImageSize/2} cy={themeImageSize/2} fill='white'/>
          <image href={'/images/' + th + '.png'} width={themeImageSize} style="cursor:pointer; opacity:{($themeSelection !== th) ? '0.4' : '1'}" on:click={() => onChangeTheme(th)}/>
          {#if $themeSelection === th}
            <text text-anchor='middle' x={themeImageSize/2} y={themeImageSize+20} style='fill:white; font-size:14px'>{th}</text>
          {/if}
        </g>
      {/each}
    </svg>
  </div>
  <h3><strong class='step'>2</strong> Selecteer een indicator</h3>
  <div class='selection-div'>
    <Select --font-size="12px" items={indicatorOptions} placeholder="Selecteer indicator..." value={$indicatorSelection} clearable={false} on:change={e => onChangeIndicator(e.detail.value)}/>
  </div>
  <h3><strong class='step'>3</strong> Selecteer een scenario</h3>
  <div class='selection-div'>
    <Select --font-size="12px" items={$period_options} placeholder="Selecteer periode..." value={$periodSelection} clearable={false} on:change={onChangePeriod}/>
  </div>
  <h3><strong class='step'>4</strong> Pas locatie aan op de kaart</h3>
</div>


<style>

  .roughsvg{
    position: fixed;
    left:0;
    top:0;
    filter: drop-shadow(rgb(0,0,0,0.4) 1rem 0.5rem 10px);
    z-index: -1000;
  }

  svg{
    width:100%;
  }

  .sidepanel-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h2, h3{
    color:white;
    width:100%;
    text-align:center;
    margin:30px 0px 15px 0px;
  }

  .themas{
    width:100%;
    /* margin: 0px 5% 0px 5%; */
  }

  .thema{
    width:20%;
    padding:2.5%;
    float:left;
  }

  .thema p{
    text-align:center;
    color:white;
  }

  .selection-div{
    width:250px;
  }

  .step{
    padding:2px 8px 2px 8px;
    background-color:white;
    border-radius:50px;
    color:#35575A;
    font-size:20px;
  }

  .more-info{
    position:fixed;
    background-color: #35575A;
    padding:1px 8px 1px 8px;
    border-radius:50px;
    color:white;
    font-size:20px;
    z-index: 1000;
    visibility: hidden;
  }

  .indicator-info{
    visibility:hidden;
    position: fixed;
    width:450px;
    background-color: white;
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 20px;
    padding:10px 20px 10px 20px;
  }

  .more-info:hover ~ .indicator-info{
    visibility:visible;
  }
  
</style>