<script>
  import { indicatorSelection, lang, periodSelection, themeSelection, period_options, neerslagIndicatoren, modal, indicatorOptions, brabantKEA } from '$lib/stores';
  import Select from 'svelte-select'
  import { bind } from 'svelte-simple-modal';
  import Info from './Info.svelte';
  import { t } from '$lib/i18n/translate';
  import { goto } from '$app/navigation';
  import { onChangeIndicator } from '$lib/noncomponents/onChangeIndicator';
  import { select, selectAll } from 'd3';

  export let w;
  export let h;

  // const gridcode = 'cellen_lat_lon_XYTableToPoint1_cellen'

  function onChangePeriod(e){
    periodSelection.set(e.detail.value)
  }

  function onChangeTheme(th){
    const engels = ($lang === 'en') ? 'lang=en' : ''
    const brabant = ($brabantKEA === true) ? 'regio=brabant' : ''

    selectAll('.thema').style('opacity', 0.4)
    selectAll('.thema-' + th).style('opacity', 1)
    select('.text-' + th).transition().duration(500).attr('y', themeImageSize+20)

    goto(`/${th.toLowerCase()}?${engels}&${brabant}`)
  }

  const themeImageOffset = 10
  $: themeImageSize = (w - 7*themeImageOffset)/4

  function mouseOver(th){
    if(th !== $themeSelection){select('.thema-' + th).style('opacity', 0.8)}
    if(th !== $themeSelection){select('.text-' + th).style('opacity', 0.5).attr('y', themeImageSize+35)}
  }
  function mouseOut(th){
    if(th !== $themeSelection){select('.thema-' + th).style('opacity', 0.4)}
    if(th !== $themeSelection){select('.text-' + th).style('opacity', 0).attr('y', themeImageSize+20)}
  }

  const showModal = (type) => {
    modal.set(bind(Info, { type : type}))
  };

</script>

{#if w}
  <svg class='roughsvg'>
    <g class='rough-sidepanel'></g>
    <rect width={w} height={h} fill='#35575A'/>
  </svg>
{/if}

<div class='sidepanel-content'>
  <img src='/images/about.png' width='30px' style='margin-top:20px;cursor:pointer' on:click={() => showModal('intro')}/>
  <h3 style='margin-top:25px'><strong class='step'>1</strong>{' ' + t('thema-selectie')}</h3>
  <div class='themas'>
    <svg style='height:{themeImageSize*1.8}px'>
      {#each ['Hitte', 'Droogte', 'Wateroverlast' , 'Zeespiegelstijging'] as th,i}
        <g class='thema thema-{th}' transform='translate({themeImageOffset*2+(themeImageOffset+themeImageSize)*i},{0})' opacity={($themeSelection !== th) ? '0.4' : '1'} on:mouseover={() => mouseOver(th)} on:mouseout={() => mouseOut(th)}>
          <circle r={themeImageSize/2} cx={themeImageSize/2} cy={themeImageSize/2} fill='white'/>
          <image class='image-{th}' href={'/images/' + th + '.png'} width={themeImageSize} style="cursor:pointer; opacity:{($themeSelection !== th) ? '0.4' : '1'}" on:click={() => onChangeTheme(th)}/>
          {#if th !== t('Zeespiegelstijging')}
            <text class='text-{th}' text-anchor='middle' x={themeImageSize/2} y={themeImageSize+20} style='opacity:{($themeSelection === th) ? 1 : 0};fill:white; font-size:14px'>{t(th)}</text>
          {:else}
            <text class='text-{th}' text-anchor='middle' x={themeImageSize/2} y={themeImageSize+15} style='opacity:{($themeSelection === th) ? 1 : 0};fill:white; font-size:14px'>Zeespiegel</text>
            <text class='text-{th}' text-anchor='middle' x={themeImageSize/2} y={themeImageSize+35} style='opacity:{($themeSelection === th) ? 1 : 0};fill:white; font-size:14px'>stijging</text>
          {/if}
        </g>
      {/each}
    </svg>
  </div>
  {#if $indicatorSelection !== t('Zeespiegelstijging')}
    <h3><strong class='step'>2</strong> {t('indicator-selectie')}</h3>
    <div class='selection-div'>
      <Select --font-size="14px" items={$indicatorOptions} placeholder="Selecteer indicator..." value={$indicatorSelection} clearable={false} on:change={e => onChangeIndicator(e.detail.value)}/>
    </div>
    <h3><strong class='step'>3</strong> {t('scenario-selectie')}</h3>
    <div class='selection-div'>
      <Select --font-size="14px" items={$period_options} placeholder="Selecteer periode..." value={$periodSelection} clearable={false} on:change={onChangePeriod}/>
    </div>
    <h3><strong class='step'>4</strong> {t('change-location')}</h3>
    <p style='color:white; font-style:italic; font-size:12px; margin-top:0'>{`${t('klikop')} ${($neerslagIndicatoren.includes($indicatorSelection)) ? t('gebied') : t('bolletje')} ${t('op de kaart')}`}</p>
    <h4>{t('databron')}: KNMI</h4>
  {/if}
  
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
    font-size: 2.3vh;
    text-align:center;
    margin:30px 0px 15px 0px;
  }

  h4{
    color:white;
    width:100%;
    text-align:center;
    margin-bottom: 0px;
    font-style: normal;
    font-size: 14px;
    
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

  .knmilogo{
    position: absolute;
    bottom:0px;
  }
  
</style>