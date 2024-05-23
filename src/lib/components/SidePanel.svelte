<script>
  import { indicatorSelection, colorScale } from '$lib/stores';
  import { select, scaleLinear } from 'd3';
  import rough from 'roughjs';
  import { afterUpdate } from 'svelte';
  import Select from 'svelte-select'

  export let w;
  export let h;

  const indicatoren = [
    {label:'Tropische dagen', value:'tropischedagen'},
    {label:'Reeks droge dagen', value:'reeksdrogedagen'}
  ]

  function onChange(e){
    indicatorSelection.set(e.detail.value)

    const domain = ($indicatorSelection === 'tropischedagen')
      ? [0,10,20,30,40,50,60]
      : [14,15,16,17,18,19,20]
    const range = ($indicatorSelection === 'tropischedagen')
      ? ['#F5F908', '#F5AC05', '#F55E05', '#FA2804', '#F00004', '#780103', '#000000']
      : ['#F5F908', '#F5AC05', '#F55E05', '#FA2804', '#F00004', '#780103', '#000000']
    colorScale.set(
      scaleLinear()
      .domain(domain)
      .range(range)
    )
  }
  
  let svgElement;
  afterUpdate(() => {
    select('.rough-sidepanel g').remove()
    const rc = rough.svg(svgElement);

    // a 3 10 0 0 1 ${w*0.25} ${h*0.5}
    // a 3 10 0 0 0 ${w*0.25} ${h*0.5}
    const path = rc.path(
      `M0 0 l${w} 0 l0 ${h}

      l${-2*w} 0 z`,
      { 
        roughness: 0.3, 
        fill: '#35575A', 
        stroke: 'none',
        fillStyle:'cross-hatch',
        fillWeight: 1,
        hachureGap: 2.2,
        hachureAngle: 45,
        strokeWidth: 4
      });
    svgElement.appendChild(path);
  })
</script>

{#if w}
  <svg>
    <g class='rough-sidepanel' bind:this={svgElement}></g>

    <!-- <path fill='#35575A' style='filter: drop-shadow(rgb(0,0,0,0.4) 1rem 0.5rem 10px)'
      d="M0 0 l{w-50} 0
      a 4 10 0 0 1 {w*0.25} {h*0.5}
      a 4 10 0 0 0 {w*0.25} {h*0.5}
      l{-2*w} 0 z"
    /> -->
  </svg>
{/if}

<div class='sidepanel-content'>
  <h2>KNMI-statistieken 2024</h2>
  <div class='themas'>
    {#each ['hitte', 'droogte', 'wind' , 'zst'] as th}
      <div class='thema'>
        <img src={'https://raw.githubusercontent.com/sophievanderhorst/data/main/' + th + '_carib.png'} />
        <p>{th}</p>
      </div>
    {/each}
  </div>
  <h3>Selecteer indicator</h3>
  <div class='selection-div'>
    <Select items={indicatoren} placeholder="Selecteer indicator..." value={$indicatorSelection} clearable={false} on:change={onChange}/>
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
  
</style>