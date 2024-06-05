<script>
  import { indicatorSelection, colorScale, periodSelection, themeSelection, indicatorMetaData } from '$lib/stores';
  import { select, scaleLinear } from 'd3';
  import rough from 'roughjs';
  import { afterUpdate } from 'svelte';
  import Select from 'svelte-select'
  import ThreeSwitch from './ThreeSwitch.svelte';

  export let w;
  export let h;

  const indicatorOptions = $indicatorMetaData.map((ind) => {return {label:ind['Indicator'], value:ind['Indicator']}})

  function onChangeIndicator(e){
    indicatorSelection.set(e.detail.value)

    const metadata = $indicatorMetaData.filter((ind) => ind['Indicator'] === e.detail.value)[0]
    const domain = metadata['y-as domein'].split(',')
    const range = metadata['Kleuren'].split(',')
    
    colorScale.set(
      scaleLinear()
      .domain(domain)
      .range(range)
    )
  }

  function onChangePeriod(e){
    periodSelection.set(e.detail.value)
  }
  
  let svgElement;
  // afterUpdate(() => {
  //   select('.rough-sidepanel g').remove()
  //   const rc = rough.svg(svgElement);

  //   // a 3 10 0 0 1 ${w*0.25} ${h*0.5}
  //   // a 3 10 0 0 0 ${w*0.25} ${h*0.5}
  //   const path = rc.path(
  //     `M0 0 l${w} 0 l0 ${h}

  //     l${-2*w} 0 z`,
  //     { 
  //       roughness: 0.3, 
  //       fill: '#35575A', 
  //       stroke: 'none',
  //       fillStyle:'cross-hatch',
  //       fillWeight: 1,
  //       hachureGap: 2.2,
  //       hachureAngle: 45,
  //       strokeWidth: 4
  //     });
  //   svgElement.appendChild(path);
  // })

  const period_options = [
      { value: 'ref', label: 'Huidig klimaat'},
      { value: '2050laag', label: 'Klimaat laag 2050/2100'},
      { value: '2050hoog', label: 'Klimaat 2050 hoog'},
      { value: '2100hoog', label: 'Klimaat 2100 hoog'}
  ];
</script>

{#if w}
  <svg>
    <g class='rough-sidepanel' bind:this={svgElement}></g>
      <rect width={w} height={h} fill='#35575A'/>

    <!-- <path fill='#35575A' style='filter: drop-shadow(rgb(0,0,0,0.4) 1rem 0.5rem 10px)'
      d="M0 0 l{w-50} 0
      a 4 10 0 0 1 {w*0.25} {h*0.5}
      a 4 10 0 0 0 {w*0.25} {h*0.5}
      l{-2*w} 0 z"
    /> -->
  </svg>
{/if}

<div class='sidepanel-content'>
  <h3>Selecteer thema</h3>
  <div class='themas'>
    {#each ['Hitte', 'Droogte', 'Wateroverlast' , 'Overstroming'] as th}
      <div class='thema'>
        <img src={'/images/' + th + '.png'} style="cursor:pointer; opacity:{($themeSelection !== th) ? '0.4' : '1'}" on:click={() => themeSelection.set(th)}/>
        {#if $themeSelection === th}
          <p>{th}</p>
        {/if}
      </div>
    {/each}
  </div>
  <h3>Selecteer indicator</h3>
  <div class='selection-div'>
    <Select items={indicatorOptions} placeholder="Selecteer indicator..." value={$indicatorSelection} clearable={false} on:change={onChangeIndicator}/>
  </div>
  <!-- {#if $indicatorSelection === 'tropischedagen'}
    <p style='color:white; padding:20px; font-size:11.5px'>De grafieken tonen het gemiddelde aantal tropische dagen per jaar in huidige klimaat (1990-2020) en voor het klimaat rond 2050 en 2100 (waarden voor het laagste (Ln) en hoogste (Hd) KNMI’23 klimaatscenario). We spreken in Nederland van een tropische dag als de maximumtemperatuur 30 °C of hoger is. Door de temperende werking van de zee komen tropische dagen aan de kust minder vaak voor dan in het binnenland. Het hoogste aantal tropische dagen worden in het zuidoosten van ons land behaald. In de toekomst zal het aantal tropische dagen overal in Nederland stijgen. Tropische dagen zorgen vaak voor hittestress, met name bij ouderen en zieken. Ook bij anderen kan hittestress optreden wanneer men lang buiten in de zon is (bijv. bij openlucht muziek festivals) en/of bij grote fysieke inspanningen (bijv. tijdens de Nijmeegse vierdaagse).</p>
  {/if} -->
  <h3>Selecteer periode kaart</h3>
  <div class='selection-div'>
    <Select items={period_options} placeholder="Selecteer periode..." value={$periodSelection} clearable={false} on:change={onChangePeriod}/>
  </div>
  <h3>Toon scenario grafiek</h3>
  <div class='switch-div'>
    <ThreeSwitch {w}/>
  </div>
</div>


<style>

  svg{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    filter: drop-shadow(rgb(0,0,0,0.4) 1rem 0.5rem 10px);
    z-index: -1000;
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
    margin-bottom:10px;
  }

  .themas{
    width:90%;
    margin: 0px 5% 0px 5%;
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

  img{
    width:100%;
    background-color: #fcfbf2;
    border-radius: 100%;
  }

  .selection-div{
    width:200px
  }

  .switch-div{
    width:100%;
  }
  
</style>